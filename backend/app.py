from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
from src.helper import download_hugging_face_embeddings
from langchain.vectorstores import Pinecone
import pinecone
from langchain.prompts import PromptTemplate
from langchain.llms import CTransformers
from langchain.chains import RetrievalQA
from dotenv import load_dotenv
from src.prompt import *
import os
import tempfile
from transformers import pipeline, AutoModelForSpeechSeq2Seq, AutoProcessor
import torch
import librosa
import soundfile as sf
import  os

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": ["https://tiba-tech.vercel.app"],
        "methods": ["GET", "POST"],
        "allow_headers": ["Content-Type"]
    }
})

load_dotenv()

# Initialize audio models
device = "cuda" if torch.cuda.is_available() else "cpu"
model_id = "openai/whisper-medium"
whisper_model = AutoModelForSpeechSeq2Seq.from_pretrained(model_id)
processor = AutoProcessor.from_pretrained(model_id)
whisper_model.to(device)

# Initialize translation model
translation_model = pipeline("translation", model="Helsinki-NLP/opus-mt-mul-en", device=0 if device == "cuda" else -1)

# Initialize Pinecone and other chatbot components
PINECONE_API_KEY = os.environ.get('PINECONE_API_KEY')
PINECONE_API_ENV = os.environ.get('PINECONE_API_ENV')

embeddings = download_hugging_face_embeddings()

pc = pinecone.Pinecone(api_key=PINECONE_API_KEY, environment=PINECONE_API_ENV, timeout=60)
index_name = "medical-bot"

docsearch = Pinecone.from_existing_index(index_name, embeddings)

PROMPT = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
chain_type_kwargs = {"prompt": PROMPT}

llm = CTransformers(
    model="llama-2-7b-chat.ggmlv3.q4_0.bin",
    model_type="llama",
    config={"max_new_tokens": 512, "temperature": 0.8}
)

qa = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=docsearch.as_retriever(search_kwargs={'k': 2}),
    return_source_documents=True,
    chain_type_kwargs=chain_type_kwargs
)

@app.route("/process-audio", methods=["POST"])
def process_audio():
    try:
        if 'audio' not in request.files:
            return jsonify({"error": "No audio file provided"}), 400
        
        audio_file = request.files['audio']
        
        # Save the uploaded file temporarily
        with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as tmp_file:
            audio_file.save(tmp_file.name)
            tmp_filename = tmp_file.name
        
        try:
            # Load audio using librosa for preprocessing
            audio_array, sample_rate = librosa.load(tmp_filename, sr=16000)
            sf.write(tmp_filename, audio_array, sample_rate)
            
            # Transcribe using Whisper
            input_features = processor(
                audio_array, 
                sampling_rate=sample_rate, 
                return_tensors="pt"
            ).input_features.to(device)
            
            # Generate transcription
            predicted_ids = whisper_model.generate(input_features)
            transcription = processor.batch_decode(
                predicted_ids, 
                skip_special_tokens=True
            )[0]
            
            # Process language detection and translation
            if transcription:
                # If not in English, translate to English
                if not transcription.strip().startswith("[en]"):
                    translated = translation_model(transcription)[0]['translation_text']
                else:
                    # Remove the language tag if it's English
                    translated = transcription.replace("[en]", "").strip()
                
                return jsonify({
                    "text": translated,
                    "original_text": transcription,
                    "status": "success"
                })
            else:
                return jsonify({"error": "Failed to transcribe audio"}), 500
                
        finally:
            # Clean up the temporary file
            if os.path.exists(tmp_filename):
                os.remove(tmp_filename)
                
    except Exception as e:
        print("Error processing audio:", str(e))
        return jsonify({
            "error": "An error occurred while processing your audio.",
            "details": str(e)
        }), 500

@app.route("/get", methods=["POST"])
def chat():
    try:
        data = request.json
        msg = data.get("msg", "")
        print("User:", msg)
        
        result = qa({"query": msg})
        print("Response:", result["result"])
        
        return jsonify({
            "response": result["result"],
            "status": "success"
        })
    except Exception as e:
        print("Error:", str(e))
        return jsonify({
            "response": "An error occurred while processing your request.",
            "status": "error",
            "error": str(e)
        }), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8080))  # Use assigned PORT, fallback to 8080
    app.run(host="0.0.0.0", port=port, debug=True)
    
    
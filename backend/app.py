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

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:3000"],  # Add your React app's URL
        "methods": ["GET", "POST"],
        "allow_headers": ["Content-Type"]
    }
})

load_dotenv()

PINECONE_API_KEY = os.environ.get('PINECONE_API_KEY')
PINECONE_API_ENV = os.environ.get('PINECONE_API_ENV')

embeddings = download_hugging_face_embeddings()

# Initialize Pinecone
pc = pinecone.Pinecone(api_key=PINECONE_API_KEY, environment=PINECONE_API_ENV, timeout=60)
index_name = "medical-bot"

docsearch = Pinecone.from_existing_index(index_name, embeddings)

PROMPT = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
chain_type_kwargs = {"prompt": PROMPT}

# Load Language Model
llm = CTransformers(
    model="llama-2-7b-chat.ggmlv3.q4_0.bin",
    model_type="llama",
    config={"max_new_tokens": 512, "temperature": 0.8}
)

# Create QA Chain
qa = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=docsearch.as_retriever(search_kwargs={'k': 2}),
    return_source_documents=True,
    chain_type_kwargs=chain_type_kwargs
)

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
    app.run(host="0.0.0.0", port=8080, debug=True)
from src.helper import load_pdf, text_split, download_hugging_face_embeddings
from langchain import PromptTemplate
from langchain.chains import RetrievalQA
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.vectorstores import Pinecone
import pinecone
from langchain.document_loaders import PyPDFLoader, DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.prompts import PromptTemplate
from langchain.llms import CTransformers
import os


from dotenv import load_dotenv


load_dotenv()

PINECONE_API_KEY = os.environ.get('PINECONE_API_KEY')
PINECONE_API_ENV = os.environ.get('PINECONE_API_ENV')

# print(PINECONE_API_KEY)
# print(PINECONE_API_ENV)

extracted_data = load_pdf("data/")
text_chunks = text_split(extracted_data)
embeddings = download_hugging_face_embeddings()


# Initialize Pinecone
pc = pinecone.Pinecone(api_key=PINECONE_API_KEY, environment=PINECONE_API_ENV)
index_name = "medical-bot"

# Check if the index exists, otherwise create it
if index_name not in pc.list_indexes().names():
    pc.create_index(name=index_name, dimension=384, metric="cosine")
    
# Connect to the index
index = pc.Index(index_name)

# Store text embeddings in Pinecone
docsearch = Pinecone.from_documents(
    documents=text_chunks,
    embedding=embeddings,
    index_name=index_name,
    namespace="medical"
)
# from typing import Dict,List
# from fastapi import FastAPI, HTTPException
# from langchain_google_genai import ChatGoogleGenerativeAI
# from pydantic import BaseModel
# import os
# import re
# import json
# from dotenv import load_dotenv
# from fastapi.middleware.cors import CORSMiddleware

# from langchain.document_loaders import PyPDFLoader
# from langchain.vectorstores import Chroma
# from langchain.text_splitter import RecursiveCharacterTextSplitter
# from langchain.embeddings import HuggingFaceEmbeddings 
# from langchain.chains import RetrievalQA
# load_dotenv()


# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"], 
#     allow_credentials=True,
#     allow_methods=["*"], 
#     allow_headers=["*"],
# )


# GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# llm = ChatGoogleGenerativeAI(
#     model="gemini-2.0-flash",
#     temperature=0.7,
#     google_api_key=GOOGLE_API_KEY,
#     # system_message=system_prompt
# ) 


# class chatRequest(BaseModel):
#     responses: Dict[str, str]
#     chat_history: List[Dict[str, str]] = []


# def clean_and_format_response(text):
#            text = text.replace("*", "")
    
#            text = re.sub(r'•\s*', '\n• ', text)  
#            text = re.sub(r'\d+\.\s*', lambda x: f"\n{x.group()}", text)  
    
#            text = re.sub(r'\n\s*\n', '\n', text) 
#            text = text.strip() 

#            return text

# from langchain.document_loaders import TextLoader

# loader = TextLoader("data.txt")
# documents = loader.load()

# splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=100)
# docs = splitter.split_documents(documents)
# embedding = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
# db = Chroma.from_documents(docs, embedding, persist_directory="./chroma_db")
# db.persist()

# @app.post("/chat")
# async def chat(request: chatRequest):
#     print("Received Request:", request) 

#     try:
#         if not request.responses:
#             raise HTTPException(status_code=400, detail="No responses provided")

      
#         response_text = "\n".join([f"- **{q}**: {a}" for q, a in request.responses.items()])

#         if len(request.chat_history) == 1:

#            system_prompt = f"""
#             You are a disaster response assistant. A user is currently experiencing or preparing for a disaster (such as an earthquake, flood, fire, medical emergency, or similar situation). Your job is to provide **accurate, clear, and actionable instructions** tailored to their situation. Follow these guidelines:

#             1. First, identify the type of disaster or medical emergency based on the user's message.
#             2. Then provide a prioritized list of steps the user should take immediately.
#             3. If medical help is needed, include basic first aid instructions until help arrives.
#             4. Include safety and communication tips.
#             5. Keep the response concise but detailed and easy to follow in a stressful situation.
#             """
#            chat_history=[{"role": "system", "content": system_prompt}]
#         else:
#             chat_history = request.chat_history

#         print("Chat History Before Processing:", chat_history)
#         latest_message = (chat_history[-1]["content"] if chat_history else "What should I do next?")


#         chat_history.append({"role": "user", "content": latest_message})

#         formatted_history = "\n".join([f"{msg['role']}: {msg['content']}" for msg in chat_history])
 
#         formatted_history += "\n\nPlease keep your response within 100 words."

#         # response = llm.invoke(formatted_history)
#         retriever = db.as_retriever(search_kwargs={"k": 3})
#         retrieved_docs = retriever.get_relevant_documents(latest_message)
#         rag_context = "\n".join([doc.page_content for doc in retrieved_docs])
        
#         final_prompt = f"""
#          Use the following context to help answer the user's query:\n
#          {rag_context}

#          Chat History:
#          {formatted_history}
#           """

#         response = llm.invoke(final_prompt)
#         if not response:
#          raise HTTPException(status_code=500, detail="LLM returned empty response")
       
#         response_text = response.content if hasattr(response, "content") else str(response)
        
#         response_text = clean_and_format_response(response_text)
#         chat_history.append({"role": "bot", "content": response_text})
#         print("Chat History After Processing:", chat_history)

#         return {"response": response_text,"chat_history":chat_history}

#     except Exception as e:
#         print("Error:", e)
#         raise HTTPException(status_code=500, detail=str(e))


from typing import Dict, List
from fastapi import FastAPI, HTTPException
from langchain_google_genai import ChatGoogleGenerativeAI
from pydantic import BaseModel
import os
import re
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from langchain.document_loaders import TextLoader
from langchain.vectorstores import Chroma
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import HuggingFaceEmbeddings

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY not found in environment variables")

llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash",
    temperature=0.7,
    google_api_key=GOOGLE_API_KEY,
)

class ChatRequest(BaseModel):
    responses: Dict[str, str]
    chat_history: List[Dict[str, str]] = []

def clean_and_format_response(text: str) -> str:
    text = text.replace("*", "")
    text = re.sub(r'•\s*', '\n• ', text)
    text = re.sub(r'\d+\.\s*', lambda x: f"\n{x.group()}", text)
    text = re.sub(r'\n\s*\n', '\n', text)
    return text.strip()

# Load and process documents for RAG
loader = TextLoader("data.txt")
documents = loader.load()
splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=100)
docs = splitter.split_documents(documents)
embedding = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
db = Chroma.from_documents(docs, embedding, persist_directory="./chroma_db")
db.persist()

@app.post("/chat")
async def chat(request: ChatRequest):
    print("Received Request:", request)

    try:
        if not request.responses:
            raise HTTPException(status_code=400, detail="No responses provided")

        response_text = "\n".join([f"- **{q}**: {a}" for q, a in request.responses.items()])

        # Initialize chat history with system prompt if empty
        if not request.chat_history:
            system_prompt = """
            You are a disaster response assistant. A user is experiencing or preparing for a disaster (e.g., earthquake, flood, fire, medical emergency). Provide accurate, clear, and actionable instructions tailored to their situation:
            1. Identify the disaster or emergency type.
            2. List prioritized immediate steps.
            3. Include basic first aid if medical help is needed.
            4. Provide safety and communication tips.
            5. Keep responses concise, detailed, and easy to follow.
            """
            chat_history = [{"role": "system", "content": system_prompt}]
        else:
            chat_history = request.chat_history

        print("Chat History Before Processing:", chat_history)
        latest_message = response_text or (chat_history[-1]["content"] if chat_history else "What should I do next?")

        # Append user message to chat history
        chat_history.append({"role": "user", "content": latest_message})

        # Retrieve relevant documents for RAG
        retriever = db.as_retriever(search_kwargs={"k": 3})
        retrieved_docs = retriever.invoke(latest_message)
        rag_context = "\n".join([doc.page_content for doc in retrieved_docs])

        # Format chat history for prompt
        formatted_history = "\n".join([f"{msg['role']}: {msg['content']}" for msg in chat_history])
        final_prompt = f"""
        Context:\n{rag_context}\n\n
        Chat History:\n{formatted_history}\n\n
        Respond within 200 words with actionable advice.
        """

        # Invoke Gemini LLM
        response = llm.invoke(final_prompt)
        if not response or not hasattr(response, "content"):
            raise HTTPException(status_code=500, detail="LLM returned invalid or empty response")

        response_text = clean_and_format_response(response.content)
        chat_history.append({"role": "bot", "content": response_text})
        print("Chat History After Processing:", chat_history)

        return {"response": response_text, "chat_history": chat_history}

    except Exception as e:
        print("Error:", str(e))
        raise HTTPException(status_code=500, detail=str(e))
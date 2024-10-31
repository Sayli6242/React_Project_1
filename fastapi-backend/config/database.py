from pymongo import MongoClient

client = MongoClient("mongodb+srv://Sayli1603:7410744850@cluster1.cjimyhw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1")

db = client.jobs_portal_db

collection_name = db["jobs_collection"]
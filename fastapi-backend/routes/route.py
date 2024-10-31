from fastapi import APIRouter , Query
from models.data import Jobs
from config.database import collection_name
from schema.schemas import single_job_schema, multiple_jobs_schema
from bson import ObjectId, errors
from fastapi import HTTPException
from typing import Optional

# by using bson that is the way mongodb identifies the id that it create inself

# from fastapi.responses import JSONResponse
# from fastapi import APIRouter, Query
# from typing import List, Optional
# from config.database import collection_name


router = APIRouter()


@router.get("/jobs")
async def get_all_jobs(
    location: Optional[str] = Query(None),
    job_type: Optional[str] = Query(None),
    title: Optional[str] = Query(None),
    limit: int = Query(10, ge=1) , # default limit is 10, minimum value is 1
    skip: int = Query(0, ge=0)  # default skip is 0, minimum value is 0
):
    query = {}

    if location:
        query["location"] = {"$regex": location, "$options": "i"}
    if job_type:
        query["job_type"] = {"$regex": job_type, "$options": "i"}
    if title:
        query["title"] = {"$regex": title, "$options": "i"}

    jobs = multiple_jobs_schema(collection_name.find(query).skip(skip).limit(limit))
    return jobs

@router.get("/jobs/{id}")
async def get_job(id):
    job = single_job_schema(collection_name.find_one({"_id": ObjectId( id )}))
    return job


@router.post("/jobs")
async def create_job(job: Jobs):
    collection_name.insert_one(dict(job)) 
    return job



@router.put("/jobs/{id}")
async def update_job(id: str, job: Jobs):
    try:
        result = collection_name.update_one({"_id": ObjectId(id)}, {"$set": dict(job)})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Job not found")
        elif result.modified_count == 0:
            return {"message": "Job not updated, no changes made"}
        else:
            return {"message": "Job updated successfully"}
    except errors.InvalidId:
        raise HTTPException(status_code=400, detail="Invalid job ID format")
        
    
@router.delete("/jobs/{id}")
async def delete_job(id: str):
    result = collection_name.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 0:
        return {"message": "Job deleted successfully"}


    

# # Add OPTIONS method to handle pre-flight requests
# @router.options("/jobs/{job_id}")
# async def options_job(job_id: str):
#     return JSONResponse(content={})



# @router.get("/jobs/?location=...&job_type=...&title=...", response_model=List[dict])
# async def filter_jobs(
#     location: Optional[str] = Query(None),
#     job_type: Optional[str] = Query(None),
#     title: Optional[str] = Query(None)
# ):
#     query = {}
    
#     if location:
#         query["location"] = {"$regex": location, "$options": "i"}  # Case-insensitive search
#     if job_type:
#         query["job_type"] = {"$regex": job_type, "$options": "i"}  # Adjust field name if necessary
#     if title:
#         query["title"] = {"$regex": title, "$options": "i"}  # Adjust field name if necessary

#     jobs = list(collection_name.find(query))  # Fetch jobs based on filters
#     for job in jobs:
#         job["_id"] = str(job["_id"])  # Convert ObjectId to string for JSON serialization
#     return jobs






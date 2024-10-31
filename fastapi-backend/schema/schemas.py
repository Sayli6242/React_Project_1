def single_job_schema(job) -> dict:
  
    return {
          "_id": str(job["_id"]),
        "title": job["title"],
        "job_type": job["job_type"],
        "description": job["description"],
        "location": job["location"],
        "salary": job.get("salary", ""), # assign empty string if the key does not exist
        "company": {
            "name": job.get("company", {}).get("name", ""), # assign empty string if the key does not exist
            "description": job.get("company", {}).get("description", ""), # assign empty string if the key does not exist
            "contactEmail": job.get("company", {}).get("contactEmail", ""), # assign empty string if the key does not exist
            "contactPhone": job.get("company", {}).get("contactPhone", "") # assign empty string if the key does not exist
        }
    }

def multiple_jobs_schema(jobs) -> list:
    return [single_job_schema(job) for job in jobs] 
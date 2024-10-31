from pydantic import BaseModel

class Jobs(BaseModel):
    title: str
    job_type: str
    description: str
    location: str
    salary: str
    company: dict = {
        "name": str,
        "description": str,
        "contactEmail": str,
        "contactPhone": str
    }

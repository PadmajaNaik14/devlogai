from pydantic import BaseModel

class OptimizeRequest(BaseModel):
    content: str
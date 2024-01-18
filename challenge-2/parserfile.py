from langchain.output_parsers import PydanticOutputParser
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.pydantic_v1 import BaseModel, Field

from typing import List, Dict, Any


class personInformation(BaseModel):
    company_name: str = Field(description="Name of the company")
    founders: List[Dict[str, str]] = Field(description="Founders of the company")
    founded_year: int = Field(description="Founded year of the company")
    team_size: int = Field(description="Employes of the company")
    jobs: List[Dict[str, str]] = Field(description="Jobs of the company")
    launch_posts: List[Dict[str, str]] = Field(description="Launch posts of the company")
    website: str = Field(description="Website of the company")
    location: str = Field(description="Location of the company")
    email: str = Field(description="Email of the company")
    linkedin_url: str = Field(description="Linkedin URL of the company")
    verticals: List[str] = Field(description="Verticals of the company")

    # def to_dict(self) -> Dict[str, Any]:
    #     return {
    #         "company_name": self.company_name,
    #         "founders": self.founders,  # List of dictionaries
    #         "founded_year": self.founded_year,
    #         "team_size": self.team_size,
    #         "jobs": self.jobs,  # List of dictionaries
    #         "launch_posts": self.launch_posts,  # List of dictionaries
    #         "website": self.website
    #     }


person_information_parse = JsonOutputParser(
    pydantic_object=personInformation
)

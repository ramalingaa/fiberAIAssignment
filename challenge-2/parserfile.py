from langchain.output_parsers import PydanticOutputParser
from langchain_core.pydantic_v1 import BaseModel, Field
from langchain_core.output_parsers import JsonOutputParser

from typing import List


class personInformation(BaseModel):
    description: str = Field(description="description of company")
    founder: List[str] = Field(description="Founders of the company")
    employes_count: int = Field(description="Employes of the company")

    def to_dict(self):
        return {
            "description": self.description,
            "founder": self.founder,
            "employes_count": self.employes_count
        }


person_information_parse = JsonOutputParser(
    pydantic_object=personInformation
)
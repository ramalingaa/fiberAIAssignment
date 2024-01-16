import os


from parserfile import person_information_parse
from webscraper import extract_html_from_url

from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain_community.chat_models import AzureChatOpenAI

os.environ["AZURE_OPENAI_API_KEY"] = "802ad67bd5fb421a80cae271c7d3d52a"
os.environ["AZURE_OPENAI_ENDPOINT"] = "https://mockman-feedback.openai.azure.com/"


def ice_breaker():
    print("Hello LLM")

    summary_template = """ given the company information {information} of a company on Y-combinator page in html format, I want to extract information about the company.:
        extract the following text infromation from the html:
        1. Full description of the company which is present as a comapny info. 
        2. Founder/Founders of the company only return founders names with out any info.
        3. Number of employees.
        4
        \n{format_instructions}
    """
    llm_model = AzureChatOpenAI(
        openai_api_type="azure",
        deployment_name="mockman-interviewdata",
        openai_api_version="2023-07-01-preview",
    )

    prompt = PromptTemplate(
        template=summary_template,
        input_variables=["information"],
        partial_variables={"format_instructions": person_information_parse.get_format_instructions()},
    )
    llm_chain = LLMChain(llm=llm_model, prompt=prompt)

    
    company_profile_data = extract_html_from_url("https://www.ycombinator.com/companies/fiber-ai")
    user_data = llm_chain(
            inputs={"information": company_profile_data},
            return_only_outputs=True,
        )
    # return user_data["text"]
    print(user_data["text"])
ice_breaker()
# url = "https://fresh-linkedin-profile-data.p.rapidapi.com/get-linkedin-profile"
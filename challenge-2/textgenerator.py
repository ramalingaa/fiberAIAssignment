import os
from parserfile import person_information_parse
from webscraper import extract_html_from_url

from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain_openai import AzureChatOpenAI

os.environ["AZURE_OPENAI_API_KEY"] = "802ad67bd5fb421a80cae271c7d3d52a"
os.environ["AZURE_OPENAI_ENDPOINT"] = "https://mockman-feedback.openai.azure.com/"


def extract_company_info(url: str):
    print("Hello LLM")

    summary_template = """ given the company information {information} of a company on Y-combinator page in html format, I want you to extract information about the company. You are not allowed to make any assumptions while extracting the information. Every link you provide should be from the information given. There should be no assumptions for Links/URLS. You should not return code to do it.:
        You should extract the following text infromation from the html:
        1. Full Name of the company.
        2. Founder/Founders of the company. For each founder You should Include linkedin URL of the founders present in the information given to you.You should not assume any other information about the founder and linkedin URL's.
        3. Founded Year.
        4. Team Size.
        5. If Job postings by the company available in the given information. For each job post you should include title and location.
        6. if Launch Posts of the company available in the given information. For each launch post you should include title and URL or web link of that launch post.
        7. Website of the Company.
        8.Location of the Company.
        9.Email of the Company.
        10.Company's LinkedIn URL.
        11.Business Verticals of the company
        \n{format_instructions}
    """
    llm_model = AzureChatOpenAI(
        openai_api_type="azure",
        deployment_name="mockman-interviewdata",
        openai_api_version="2023-07-01-preview",
        temperature=0,
    )

    prompt = PromptTemplate(
        template=summary_template,
        input_variables=["information"],
        partial_variables={"format_instructions": person_information_parse.get_format_instructions()},
    )
    llm_chain = LLMChain(llm=llm_model, prompt=prompt)

    
    company_profile_data = extract_html_from_url(url)
    user_data = llm_chain.invoke(
            input={"information": company_profile_data},
            return_only_outputs=True,
        )
    return user_data["text"]

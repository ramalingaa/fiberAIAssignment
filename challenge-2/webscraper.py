from langchain_community.document_loaders import AsyncHtmlLoader
from langchain_community.document_transformers import Html2TextTransformer
from typing import List


urls = ["https://www.ycombinator.com/companies/fiber-ai"]

def extract_html_from_url(url: str) -> List[str]:
    loader = AsyncHtmlLoader([url])
    docs = loader.load()
    html2text = Html2TextTransformer()
    docs_transformed: List[str] = html2text.transform_documents(docs)
    return docs_transformed
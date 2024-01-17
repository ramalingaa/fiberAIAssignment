# from langchain_community.document_loaders import AsyncHtmlLoader
# # from langchain_community.document_transformers import Html2TextTransformer
# from langchain_community.document_loaders import AsyncChromiumLoader
# # from langchain_community.document_transformers import BeautifulSoupTransformer
# # from bs4 import  SoupStrainer

# from bs4 import BeautifulSoup
# import html2text

# from typing import List


urls = ["https://www.ycombinator.com/companies/fiber-ai"]

# def extract_html_from_url(url: str) -> List[str]:
#     loader = AsyncHtmlLoader([url])
#     html_content = loader.load()
#     soup = BeautifulSoup(html_content, 'html.parser')
#     # bs_transformer = BeautifulSoupTransformer()
#     # docs_transformed = bs_transformer.transform_documents(html, tags_to_extract=["span", "a", "p", "h"])
#     # docs = loader.load()
#     # html2text = Html2TextTransformer()
#     # docs_transformed: List[str] = html2text.transform_documents(html)
#     text_content = html2text.html2text(str(soup))

#     print(text_content)
#     # return docs_transformed
#     # return html
# extract_html_from_url(urls[0])


import requests
from bs4 import BeautifulSoup
import html2text


def extract_html_from_url(url):
    try:
        # Fetch HTML content from the URL using requests
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for bad responses (4xx and 5xx)

        # Parse HTML content using BeautifulSoup
        soup = BeautifulSoup(response.content, 'html.parser')
        excluded_tagNames = ['footer', 'nav']
        # Exclude elements with class names 'footer' and 'navbar'
        excluded_tags = excluded_tagNames or []  # Default to an empty list if not provided
        for tag_name in excluded_tags:
            for unwanted_tag in soup.find_all(tag_name):
                unwanted_tag.extract()


        # Convert HTML to plain text using html2text
        text_content = html2text.html2text(str(soup))
        return text_content

    except requests.exceptions.RequestException as e:
        print(f"Error fetching data from {url}: {e}")
        return None

# Example usage
# url_to_fetch = "https://example.com"
# result = fetch_html_and_convert_to_text("https://www.ycombinator.com/companies/fiber-ai")

# if result is not None:
#     return result
# else :
#     print("Error fetching data from the URL")
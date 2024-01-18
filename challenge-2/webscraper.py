
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
        return f"Error fetching data from {url}: {e}"


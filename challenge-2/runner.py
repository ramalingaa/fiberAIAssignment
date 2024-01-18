from parsecsv import parse_csv_to_list
import json
from infoextractllm import extract_company_info
from json.decoder import JSONDecodeError
import os

failed_writes = []

# Checks if a string is valid JSON or not and returns boolean value
def is_valid_json(json_str):
    try:
        json.loads(json_str)
        return True
    except JSONDecodeError:
        return False
# Writes data to a JSON file and appends the new data to the existing array
def write_data_to_file(new_data, file_path, company_url):
    if not is_valid_json(new_data):
        failed_writes.append(company_url)
        print("Invalid JSON data. Skipping update.", len(failed_writes))
        return
    data = json.loads(new_data)
    try:
        # Read the existing data from the file
        with open(file_path, mode='r', encoding='utf-8') as input_file:
            existing_data = json.load(input_file)
    except FileNotFoundError:
        # If the file doesn't exist, initialize with an empty array
        existing_data = []

    # Append the new data to the existing array
    existing_data.append(data)

    # Write the updated data back to the file
    with open(file_path, mode='w', encoding='utf-8') as output_file:
        json.dump(existing_data, output_file, indent=4)
# Main function that calls other functions and writes data to a JSON file
if __name__ == "__main__":
    companyInformation = parse_csv_to_list('./inputs/companies.csv')
    out_folder = './out'
    out_file = 'scraped.json'
    out_path = os.path.join(out_folder, out_file)
    # Create the 'out' folder if it doesn't exist
    if not os.path.exists(out_folder):
        os.makedirs(out_folder)
    currentIndex = 0
    for company in companyInformation:
        print(f"Scraping {company['YC URL']}", currentIndex)
        companyInfo = extract_company_info(company['YC URL'])
        write_data_to_file(companyInfo, "./out/scraped.json", company['YC URL'])
        currentIndex += 1




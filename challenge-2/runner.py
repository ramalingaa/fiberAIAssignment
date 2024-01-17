from parsecsv import parse_csv_to_list
import json
from textgenerator import extract_company_info
from json.decoder import JSONDecodeError


def is_valid_json(json_str):
    try:
        json.loads(json_str)
        return True
    except JSONDecodeError:
        return False
def write_data_to_file(new_data, file_path):

    if not is_valid_json(new_data):
        print("Invalid JSON data. Skipping update.")
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
def main():
    companyInformation = parse_csv_to_list('./inputs/companies.csv')
    currentIndex = 0
    for company in companyInformation:
        print(f"Scraping {company['YC URL']}", currentIndex)
        companyInfo = extract_company_info(company['YC URL'])
        print(companyInfo)
        write_data_to_file(companyInfo, "./out/scrapped.json")
        currentIndex += 1

main()
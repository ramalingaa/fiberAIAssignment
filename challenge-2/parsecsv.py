import csv

def parse_csv_to_list(file_path):
    with open(file_path, mode='r', encoding='utf-8') as csv_file:
        # Create a csv.DictReader
        csv_reader = csv.DictReader(csv_file)
        # Read the CSV data into a list of dictionaries
        data_list = [row for row in csv_reader]
    return data_list

# Usage example:
csv_data = parse_csv_to_list('./inputs/companies.csv')

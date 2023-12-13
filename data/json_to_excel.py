import pandas as pd
import json
import openpyxl 

# Read the JSON file
json_file_path = './data/timesheets.json'

try:
    with open(json_file_path, 'r') as file:
        json_data = json.load(file)

    # Convert the dictionary to a DataFrame
    df = pd.DataFrame.from_dict(json_data, orient='index')

    # Write DataFrame to Excel file using openpyxl
    excel_file_path = 'timesheets.xlsx'
    df.to_excel(excel_file_path, index_label='JNumber', engine='openpyxl')  # Specify the engine

    print(f"Excel file '{excel_file_path}' has been created.")
except Exception as e:
    print(f"An error occurred: {e}")


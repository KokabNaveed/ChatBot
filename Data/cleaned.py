import os
import json

# Directory where your text files are stored
directory_path = r'.\Cleaned_urdu_data'  # Adjust the directory path

# Initialize an empty dictionary to hold the data from all text files
data = {}

# Loop through all text files in the directory
for filename in os.listdir(directory_path):
    if filename.endswith('.json'):  # Check if the file is a .json file
        file_path = os.path.join(directory_path, filename)  # Get the full file path
        
        # Open and read each file
        with open(file_path, 'r', encoding='utf-8') as file:
            file_content = file.read().strip()  # Read and remove any extra whitespace
        
        # Use the filename (without extension) as the key in the dictionary
        file_key = filename.split('.')[0]  # Remove the file extension
        data[file_key] = file_content  # Store the content in the dictionary

# Save the data into a JSON file
with open('2021_SE_391319.json', 'w', encoding='utf-8') as json_file:
    json.dump(data, json_file, ensure_ascii=False, indent=4)  # Convert dictionary to JSON

print("Data has been successfully converted to JSON and saved as '2021_SE_391319.json'.")

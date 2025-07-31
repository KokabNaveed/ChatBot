from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import os
import json
import time

# Step 1: Initialize Selenium WebDriver
driver = webdriver.Chrome()  # Ensure ChromeDriver is installed and accessible

try:
    # Step 2: Load the website
    url = "https://pkm.punjab.gov.pk/public"
    driver.get(url)

    # Explicitly wait for 3 minutes (180 seconds) to allow the page to load fully
    time.sleep(25)


    # Step 3: Retrieve the page source and parse it
    soup = BeautifulSoup(driver.page_source, 'html.parser')

    # Extract content and structure it for JSON
    content = soup.get_text(separator="\n", strip=True)  # Extract text
    structured_data = {
        "url": url,
        "content": content.split("\n")  # Convert content into a list of lines
    }

    # Step 4: Save the content to a JSON file
    output_dir = "./urdu_data"
    os.makedirs(output_dir, exist_ok=True)  # Ensure the directory exists
    file_path = os.path.join(output_dir, "wehari.json")

    with open(file_path, 'w', encoding='utf-8') as file:
        json.dump(structured_data, file, ensure_ascii=False, indent=4)

    print(f"Content has been successfully saved to {file_path}")

except Exception as e:
    print(f"An error occurred: {e}")

finally:
    # Step 5: Close the WebDriver
    driver.quit()




# from selenium import webdriver
# from selenium.webdriver.common.by import By
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.support import expected_conditions as EC
# from bs4 import BeautifulSoup
# import os
# import json

# # Step 1: Initialize Selenium WebDriver
# driver = webdriver.Chrome()  # Ensure ChromeDriver is installed and accessible

# try:
#     # Step 2: Load the website
#     url = "https://pkm.punjab.gov.pk/public"
#     driver.get(url)

#     # Wait for the page to load completely by checking for a specific element (adjust selector as needed)
#     WebDriverWait(driver, 180)
#     # .until(
#     #     EC.presence_of_element_located((By.TAG_NAME, "body"))
#     # )

#     # Step 3: Retrieve the page source and parse it
#     soup = BeautifulSoup(driver.page_source, 'html.parser')

#     # Extract content and structure it for JSON
#     content = soup.get_text(separator="\n", strip=True)  # Extract text
#     structured_data = {
#         "url": url,
#         "content": content.split("\n")  # Convert content into a list of lines
#     }

#     # Step 4: Save the content to a JSON file
#     output_dir = "./urdu_data"
#     os.makedirs(output_dir, exist_ok=True)  # Ensure the directory exists
#     file_path = os.path.join(output_dir, "bahawalpur.json")

#     with open(file_path, 'w', encoding='utf-8') as file:
#         json.dump(structured_data, file, ensure_ascii=False, indent=4)

#     print(f"Content has been successfully saved to {file_path}")

# except Exception as e:
#     print(f"An error occurred: {e}")

# finally:
#     # Step 5: Close the WebDriver
#     driver.quit()

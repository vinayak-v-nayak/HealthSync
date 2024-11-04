from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import csv

# Set up the Selenium WebDriver (Chrome in this case)
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

# URL of the page to scrape
url = 'https://www.insurancedekho.com/health-insurance/quotes?request=6717dc58f560c1cc69c9cc22'
driver.get(url)

# Wait for the policy cards to load
try:
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, 'hqv2card'))  # Adjust class name as necessary
    )
except Exception as e:
    print(f"Error waiting for page to load: {e}")

# Now fetch the page source after JavaScript execution
html = driver.page_source

# Parse the HTML content using BeautifulSoup
soup = BeautifulSoup(html, 'html.parser')

# Find all policy cards
policy_cards = soup.find_all('div', class_='hqv2card')

# Check if any policy cards were found
if not policy_cards:
    print("No policy cards found. Please check the HTML structure.")
    driver.quit()
    exit()

# List to store the extracted data
policies = []

# Loop through each policy card and extract details
for card in policy_cards:
    try:
        brand_name = card.find('div', class_='brandNam').get_text(strip=True)
        policy_name = card.find('h2').get_text(strip=True)
        
        # Extract coverage and premium information
        cashless_hospitals = card.find_all('span', class_='amount')[0].get_text(strip=True)
        coverage_amount = card.find_all('span', class_='amount')[1].get_text(strip=True)
        
        # Extract premium details
        monthly_premium = card.find('span', class_='rupees-f16').get_text(strip=True)
        annual_premium = card.find('span', class_='annualprice').get_text(strip=True)
        
        # Extract claim settlement ratio
        claim_settlement_ratio = card.find('div', class_='clameSection').get_text(strip=True)

        # Append the details to the list
        policies.append({
            'Brand Name': brand_name,
            'Policy Name': policy_name,
            'Cashless Hospitals': cashless_hospitals,
            'Coverage Amount': coverage_amount,
            'Monthly Premium': monthly_premium,
            'Annual Premium': annual_premium,
            'Claim Settlement Ratio': claim_settlement_ratio
        })
    except Exception as e:
        print(f"Error extracting data from a policy card: {e}")

# Define the CSV file name
csv_file_name = 'health_policies-3cr.csv'

# Write the policies to a CSV file
with open(csv_file_name, mode='w', newline='', encoding='utf-8') as file:
    writer = csv.DictWriter(file, fieldnames=policies[0].keys())
    writer.writeheader()  # Write the header
    writer.writerows(policies)  # Write the policy data

print(f"Data successfully written to {csv_file_name}")

# Quit the driver
driver.quit()

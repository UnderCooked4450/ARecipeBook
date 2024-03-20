import sys 
from recipe_scrapers import scrape_me
import json

def scrape_recipe(url):
   
    scraper = scrape_me(url, wild_mode=True)
    
    title = scraper.title()
    time = scraper.total_time()
    yields = scraper.yields()
    ingredients = scraper.ingredients()
    instructions = scraper.instructions().split('\n')  # Split instructions into an array of strings
    nutrients = scraper.nutrients()
    
    # dictionary to hold the scraped data
    scraped_data = {
        "title": title,
        "time": time,
        "yields": yields,
        "ingredients": ingredients,
        "instructions": instructions,
        "nutrients": nutrients
    }
    
    #scraped data to JSON
    json_data = json.dumps(scraped_data)
    print(json_data)

# Retrieve the URL from command-line arguments
if len(sys.argv) != 2:
    print("Usage: python webscraper.py <recipe_url>")
    sys.exit(1)

# Get the URL from command-line arguments
recipe_url = sys.argv[1]


scrape_recipe(recipe_url)

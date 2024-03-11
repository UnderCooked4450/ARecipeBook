from recipe_scrapers import scrape_me

scraper = scrape_me("https://www.allrecipes.com/recipe/16167/beef-bourguignon-i/")

title, time, yields, ingredients, instructions, nutrients = (scraper.title(),
                                                             scraper.total_time(),
                                                             scraper.yields(),
                                                             scraper.ingredients(), 
                                                             scraper.instructions(), 
                                                             scraper.nutrients())

print("Title:", title,
      "\nCooking Time:", time, "mins",
      "\nYields:", yields,
      "\nIngredients:", ingredients,
      "\nInstructions:\n", instructions,
      "\nNutrients:", nutrients)

# print(scraper.title())
# print(scraper.total_time())
# print(scraper.ingredients())

# print(scraper.instructions())
# print(scraper.instructions_list())
# scraper.yields(),
# scraper.nutrients()

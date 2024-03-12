from flask import Flask, jsonify, request
from flask_cors import CORS
from recipe_scrapers import scrape_me

app = Flask(__name__)
CORS(app)

@app.route('/search_recipes')
def search_recipes():
    query = request.args.get('query')
    url = f"https://www.allrecipes.com/search?q={query}"
    # Assuming you're scraping the first recipe for simplicity
    search_url = f"{url}"
    scraper = scrape_me(search_url)

    title, time, yields, ingredients, instructions, nutrients = (scraper.title(),
                                                                 scraper.total_time(),
                                                                 scraper.yields(),
                                                                 scraper.ingredients(),
                                                                 scraper.instructions(),
                                                                 scraper.nutrients())

    recipe_data = {
        "title": title,
        "time": time,
        "yields": yields,
        "ingredients": ingredients,
        "instructions": instructions,
        "nutrients": nutrients
    }

    return jsonify(recipe_data)

if __name__ == '__main__':
    app.run(debug=True)

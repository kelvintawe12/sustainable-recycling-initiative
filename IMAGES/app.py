from flask import Flask, jsonify, request

app = Flask(_name_)

# Mock data for waste statistics
waste_statistics = [
    {"country": "Nigeria", "waste_generated": 32500, "recycled": 10},
    {"country": "South Africa", "waste_generated": 26000, "recycled": 15},
    {"country": "Kenya", "waste_generated": 12000, "recycled": 5},
    {"country": "Egypt", "waste_generated": 30000, "recycled": 12},
     {"country": "Cameroon", "waste_generated": 30000, "recycled": 12},
]

@app.route('/')
def home():
    return "Welcome to the Waste Management API!"

# GET endpoint to fetch all waste statistics
@app.route('/api/waste-stats', methods=['GET'])
def get_waste_statistics():
    return jsonify(waste_statistics)

# POST endpoint to add new waste statistics
@app.route('/api/waste-stats', methods=['POST'])
def add_waste_statistics():
    new_stat = request.get_json()
    if not new_stat or not all(k in new_stat for k in ("country", "waste_generated", "recycled")):
        return jsonify({"error": "Invalid data format. Ensure country, waste_generated, and recycled are provided."}), 400
    waste_statistics.append(new_stat)
    return jsonify({"message": "Waste statistics added successfully!", "data": new_stat}), 201

# GET endpoint to fetch statistics for a specific country
@app.route('/api/waste-stats/<country>', methods=['GET'])
def get_country_waste_statistics(country):
    country_stat = next((stat for stat in waste_statistics if stat["country"].lower() == country.lower()), None)
    if not country_stat:
        return jsonify({"error": f"No statistics found for {country}."}), 404
    return jsonify(country_stat)

if _name_ == '_main_':
    app.run(debug=True)
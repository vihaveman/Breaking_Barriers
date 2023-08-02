from flask import Flask, request, jsonify, render_template
from pymongo import MongoClient
from credentials import username, password
import json

app = Flask(__name__)

#Define your credentials and DBname
client = MongoClient(
    f'mongodb+srv://{username}:{password}@cluster0.zftefv1.mongodb.net/')
dbname = 'worldbank'
db = client[dbname]  
print(db)

# Welcome Page
@app.route("/")
def main_page():
    return render_template('index.html')

@app.route("/predictions")
def get_predictions_data():
    collection = db['predictions']  

    # Fetch all documents from the 'predictions' collection
    dataset = list(collection.find({}))

    # Convert the ObjectId to string and remove '_id' field for JSON serialization
    for data in dataset:
        data['_id'] = str(data['_id'])
        data.pop('_id', None)

    return jsonify(dataset)

@app.route("/predictions2024")
def get_predictions_data_2024():
    collection = db['predictions']
    # Define the year 2024
    target_year = 2024
    # Create a query to filter data for the year 2024
    query = {
        "Year": target_year
    }
    # Define the fields to include in the output
    projection = {
        "_id": 0,
        "Country": "$Country Name",  # Rename the "Country Name" field to "Country"
        "Predicted_Poverty_Count": {"$round": ["$Predicted_Poverty_Count", 2]}
    }
    # Fetch documents with the 'Year' field equal to 2024 and project only the specified fields
    dataset = list(collection.find(query, projection))
    return jsonify(dataset)

@app.route("/predictions2025")
def get_predictions_data_2025():
    collection = db['predictions']
    # Define the year 2025
    target_year = 2025
    # Create a query to filter data for the year 2024
    query = {
        "Year": target_year
    }
    # Define the fields to include in the output
    projection = {
        "_id": 0,
        "Country": "$Country Name",  # Rename the "Country Name" field to "Country"
        "Predicted_Poverty_Count": {"$round": ["$Predicted_Poverty_Count", 2]}
    }
    # Fetch documents with the 'Year' field equal to 2025 and project only the specified fields
    dataset = list(collection.find(query, projection))
    return jsonify(dataset)

@app.route("/predictions2026")
def get_predictions_data_2026():
    collection = db['predictions']
    # Define the year 2026
    target_year = 2026
    # Create a query to filter data for the year 2024
    query = {
        "Year": target_year
    }
    # Define the fields to include in the output
    projection = {
        "_id": 0,
        "Country": "$Country Name",  # Rename the "Country Name" field to "Country"
        "Predicted_Poverty_Count": {"$round": ["$Predicted_Poverty_Count", 2]}
    }
    # Fetch documents with the 'Year' field equal to 2026 and project only the specified fields
    dataset = list(collection.find(query, projection))
    return jsonify(dataset)

@app.route("/predictions2027")
def get_predictions_data_2027():
    collection = db['predictions']
    # Define the year 2027
    target_year = 2027
    # Create a query to filter data for the year 2024
    query = {
        "Year": target_year
    }
    # Define the fields to include in the output
    projection = {
        "_id": 0,
        "Country": "$Country Name",  # Rename the "Country Name" field to "Country"
        "Predicted_Poverty_Count": {"$round": ["$Predicted_Poverty_Count", 2]}
    }
    # Fetch documents with the 'Year' field equal to 2027 and project only the specified fields
    dataset = list(collection.find(query, projection))
    return jsonify(dataset)

@app.route("/predictions2028")
def get_predictions_data_2028():
    collection = db['predictions']
    # Define the year 2028
    target_year = 2028
    # Create a query to filter data for the year 2028
    query = {
        "Year": target_year
    }
    # Define the fields to include in the output
    projection = {
        "_id": 0,
        "Country": "$Country Name",  # Rename the "Country Name" field to "Country"
        "Predicted_Poverty_Count": {"$round": ["$Predicted_Poverty_Count", 2]}
    }
    # Fetch documents with the 'Year' field equal to 2028 and project only the specified fields
    dataset = list(collection.find(query, projection))
    return jsonify(dataset)

# Endpoint to retrieve the entire prediction dataset
@app.route("/worldbank")
def get_wbdata_data():
    collection = db['world_bank_data']  


    # Fetch all documents from the 'predictions' collection
    dataset = list(collection.find({}))

    # Convert the ObjectId to string and remove '_id' field for JSON serialization
    for data in dataset:
        data['_id'] = str(data['_id'])
        data.pop('_id', None)

    return jsonify(dataset)

@app.route("/geoJsonData")
def geojsonData(): 
    file_path = 'data.geojson'
    with open(file_path, 'r') as f: 
        data = json.load(f)
        return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)




    # pipeline = [
    #     {
    #         "$group": {
    #             "_id": "$Country Name",
    #             "data": {
    #                 "$push": {
    #                     "Predicted_Poverty_Count": "$Predicted_Poverty_Count",
    #                     "Year": "$Year"
    #                 }
    #             }
    #         }
    #     },
    #     {
    #         "$project": {
    #             "_id": 0,
    #             "Country Name": "$_id",
    #             "data": 1
    #         }
    #     }
    # ]

    # Endpoint to retrieve the entire prediction dataset

# @app.route("/predictions")
# def get_predictions_data():
#     collection = db['predictions']  

#     # Aggregation pipeline to group data by "Country Name"
#     pipeline = [
#     {
#         "$group": {
#             "_id": "$Country Name",
#             "data": {
#                 "$push": {
#                     "Country Name": "$Country Name",
#                     "Predicted_Poverty_Count": "$Predicted_Poverty_Count",
#                     "Year": "$Year"
#                 }
#             }
#         }
#     },
#     {
#         "$project": {
#             "_id": 0,
#             "Country Name": "$_id",
#             "data": 1
#         }
#     }
# ]
#     # Execute the aggregation pipeline
#     result = list(collection.aggregate(pipeline))
#     # Convert the result to a dictionary for easier JSON serialization
#     grouped_data = {item["Country Name"]: item["data"] for item in result}
#     return jsonify(grouped_data)



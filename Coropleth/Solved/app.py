from flask import Flask, request, jsonify, render_template
from pymongo import MongoClient
from credentials import username, password

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

# Endpoint to retrieve the entire prediction dataset
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

if __name__ == '__main__':
    app.run(debug=True, port=5000)
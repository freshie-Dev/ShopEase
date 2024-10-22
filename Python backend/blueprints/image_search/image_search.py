from datetime import datetime
import random
import flask 
import os
from flask import Blueprint, jsonify, request
import pickle
import numpy as np
from sklearn.neighbors import NearestNeighbors

from blueprints.save_features.save_features import extract_features, model

image_search_bp = Blueprint('image_search', __name__)
BASE_PATH = 'blueprints/save_features/'

def create_dir(path):
    if not os.path.exists(path):
        os.makedirs(path)

create_dir("blueprints/image_search/temp_query_image")

@image_search_bp.route('/image_search',  methods=['POST'])
def image_serach():
    
    if 'query_image' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    query_image, userId = request.files['query_image'], request.form.get('userId')
    
    if query_image:
        random_number = random.randint(100000, 999999)
        current_date = datetime.now().strftime('%Y-%m-%d_%H-%M-%S')

        # image_filename = user id + unique identifier + date & time
        image_filename = f"{userId}_{random_number}_{current_date}.png"
        image_path = os.path.join("blueprints/image_search/temp_query_image", image_filename)
        query_image.save(image_path)
        
        
    filenames_path = os.path.join(f'{BASE_PATH}filenames.pkl')
    features_path = os.path.join(f'{BASE_PATH}featurevector.pkl')

    filename = pickle.load(open(filenames_path, "rb"))
    feature_list = np.array(pickle.load(open(features_path, "rb")))
 
    
    neighbors = NearestNeighbors(n_neighbors=len(filename), algorithm='brute', metric='euclidean')
    neighbors.fit(feature_list)
        
    distance, indices = neighbors.kneighbors([extract_features(img_path= image_path, model=model)])
    
    
    unique_identifiers = []
    for file in indices[0][0: len(filename)]:
        print(filename[file])
        unique_identifiers.append(os.path.basename(filename[file]))
    
    print(f"unique identifiers {unique_identifiers}")
    
    # Delete the query image after processing
    print(f'image_path is {image_path}')
    if os.path.exists(image_path):
        os.remove(image_path)
    
    
    return jsonify({"message": "results found successfully", "unique_identifiers": unique_identifiers }), 200
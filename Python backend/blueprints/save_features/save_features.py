import os
from flask import Flask, request, jsonify
import cv2
import tensorflow as tf
from keras.applications.resnet50 import ResNet50, preprocess_input
from keras.layers import GlobalMaxPool2D
import numpy as np
from numpy.linalg import norm
import pickle
from sklearn.neighbors import NearestNeighbors

# Set up model
model = ResNet50(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
model.trainable = False
model = tf.keras.Sequential([model, GlobalMaxPool2D()])

BASE_PATH = 'blueprints/save_features/'

def upload_image(image_path):
    filename=[]          
    feature_list = []
    
    filename.append(image_path)
    feature_list.append(extract_features(image_path, model))

    updated_filenames = append_filename_to_pickle(filename_list=filename)
    updated_features = append_feature_to_pickle(feature_list=feature_list)
        
def extract_features(img_path, model):
    img = cv2.imread(img_path)
    img = cv2.resize(img, (224, 224))
    img = np.array(img)
    expand_img = np.expand_dims(img, axis=0)
    pre_img = preprocess_input(expand_img)
    result = model.predict(pre_img).flatten()
    normalized = result / norm(result)
    return normalized


def append_filename_to_pickle(filename_list, pickle_filename=(os.path.join(f'{BASE_PATH}filenames.pkl'))):
    print(pickle_filename)
    if not os.path.exists(pickle_filename):
        print("if is running")
        with open(pickle_filename, 'wb') as writeFileObj:
            pickle.dump(filename_list, writeFileObj)
    else:
        print("else is runnign")
        with open(pickle_filename, 'rb') as readFileObj:
            filenames = pickle.load(readFileObj)

        filenames.append(filename_list[0])
        
        with open(pickle_filename, 'wb') as writeFileObj:
            pickle.dump(filenames, writeFileObj)
        
        with open(pickle_filename, 'rb') as readFileObj:
            updated_filenames = pickle.load(readFileObj)
        
        print(f"new filename.pkl: {updated_filenames}")
        
        return updated_filenames
        
def append_feature_to_pickle(feature_list, pickle_filename=(os.path.join(f'{BASE_PATH}featurevector.pkl'))):
    
    if not os.path.exists(pickle_filename):
        print("if is running")
        with open(pickle_filename, 'wb') as writeFileObj:
            pickle.dump(feature_list, writeFileObj)
    else:
        print("else is running")
        with open(pickle_filename, 'rb') as readFileObj:
            old_feature_list = pickle.load(readFileObj)
        
        old_feature_list.append(feature_list[0])
        
        with open(pickle_filename, 'wb') as writeFileObj:
            pickle.dump(old_feature_list, writeFileObj)
            
        with open(pickle_filename, 'rb') as readFileObj:
            updated_features = pickle.load(readFileObj)
        
        print(f" features_list.pkl {updated_features}")
        return updated_features
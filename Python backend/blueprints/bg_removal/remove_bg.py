# import pickle
# import random
# from flask import Blueprint, Flask, current_app, request, send_file, send_from_directory, jsonify
# from flask_cors import CORS
# import os
# import cv2
# import numpy as np
# import tensorflow as tf
# from keras.utils import CustomObjectScope
# # from metrics import dice_loss, dice_coef, iou, create_dir
# import base64
# from datetime import datetime

# from keras.applications.resnet50 import ResNet50, preprocess_input
# from keras.layers import GlobalMaxPool2D
# from numpy.linalg import norm





# """ CREATING A BLUEPRINT"""
# bg_removal_bp = Blueprint('bg_removal', __name__)


# """ UTILITY FUNCTIONS """
# def iou(y_true, y_pred):
#     def f(y_true, y_pred):
#         intersection = (y_true * y_pred).sum()
#         union = y_true.sum() + y_pred.sum() - intersection
#         x = (intersection + 1e-15) / (union + 1e-15)
#         x = x.astype(np.float32)
#         return x
#     return tf.numpy_function(f, [y_true, y_pred], tf.float32)

# def dice_coef(y_true, y_pred):
#     y_true = tf.keras.layers.Flatten()(y_true)
#     y_pred = tf.keras.layers.Flatten()(y_pred)
#     intersection = tf.reduce_sum(y_true * y_pred)
#     return (2. * intersection + 1e-15) / (tf.reduce_sum(y_true) + tf.reduce_sum(y_pred) + 1e-15)

# def dice_loss(y_true, y_pred):
#     return 1.0 - dice_coef(y_true, y_pred)

# def create_dir(path):
#     if not os.path.exists(path):
#         os.makedirs(path)

# def generate_masked_image(image_path, model, W, H):
#     # Reading the image
#     image = cv2.imread(image_path, cv2.IMREAD_COLOR)
#     h, w, _ = image.shape
#     x = cv2.resize(image, (W, H))
#     x = x/255.0
#     x = x.astype(np.float32)
#     x = np.expand_dims(x, axis=0)

#     # Prediction
#     y = model.predict(x)[0]
#     y = cv2.resize(y, (w, h))
#     y = np.expand_dims(y, axis=-1)

#     # Save the resulting masked image
#     masked_image = image * y

#     return masked_image, image
# """------------------------------------------------"""

# # Image dimensions
# H = 512
# W = 512

# # Seeding
# np.random.seed(42)
# tf.random.set_seed(42)

# # Creating directory for storing files if not already created
# create_dir("blueprints/bg_removal/test_images/mask")
# create_dir("blueprints/bg_removal/all_images")
# create_dir("blueprints/bg_removal/processed-images")

# # Loading model
# with CustomObjectScope({'iou': iou, 'dice_coef': dice_coef, 'dice_loss': dice_loss}):
#     model = tf.keras.models.load_model("blueprints/bg_removal/files/model.h5")
    

# """ set up model """
# model2 = ResNet50(weights='imagenet', include_top=False, input_shape=(224,224, 3) )
# model2.trainable = False
# model2 = tf.keras.Sequential([ model, GlobalMaxPool2D()])


# """ IMAGE BACKGROUND REMOVAL ROUTE """

# @bg_removal_bp.route('/process_image', methods=['POST'])
# def process_image():
#     try:
#         # Save the received image to the test_images/image directory
#         image_file, user_id, remove_bg = request.files['productImage'], request.form.get('userId'), request.form.get('isRemoveBgChecked')

#         random_number = random.randint(100000, 999999)
#         current_date = datetime.now().strftime('%Y-%m-%d_%H-%M-%S')

#         # image_filename = user id + unique identifier + date & time
#         image_filename = f"{user_id}_{random_number}_{current_date}.png"
#         image_path = os.path.join("blueprints/bg_removal/processed-images", image_filename)
#         image_file.save(image_path)

#         if remove_bg == "false":
#             imagee = cv2.imread(image_path)
#             cv2.imshow("Frame", imagee)
#             cv2.waitKey(0)
#             response_data = {
#                 'image_url': f"http://127.0.0.1:5000/processed-images/{image_filename}",
#                 'image_filename': image_filename,  # Added image filename
#             }
#             return response_data,200

#         # Generate masked image
#         masked_image, image = generate_masked_image(image_path, model, W, H)
        
#         # Generate the filename with userId_prefix_filename
#         filename_prefix = f"{user_id}_{random_number}_{current_date}.png"

#         # cat_images = np.concatenate([image, line, masked_image], axis=1)
#         cat_images = np.concatenate([image, masked_image], axis=1)
#         result_path = os.path.join("blueprints/bg_removal/processed-images", f"{filename_prefix}")
#         result_cat_path = os.path.join("blueprints/bg_removal/processed-cat-images", f"{filename_prefix}")

#         cv2.imwrite(result_path, masked_image)
#         cv2.imwrite(result_cat_path, cat_images)
        
        
        
#         imagee = cv2.imread(result_path)
#         print(f"imagee {imagee}")
#         print(f"imagee path {result_path}")
        
#         filename=[]
#         feature_list=[]
        
#         # Load existing data if files exist
#         if os.path.exists('blueprints/bg_removal/bluefilenames2.pkl'):
#             filename = pickle.load(open('blueprints/bg_removal/filenames2.pkl', 'rb'))
#         if os.path.exists('blueprints/bg_removal/featurevector2.pkl'):
#             feature_list = pickle.load(open('blueprints/bg_removal/featurevector2.pkl', 'rb'))
        
#         filename.append(result_path)
#         print(filename)

#         def extract_feature(img_path, model):
#             print(img_path)
#             img = cv2.imread(img_path)
#             img = cv2.resize(img, (224,224))
            
#             img = np.array(img)
#             expand_img = np.expand_dims(img, axis=0)
#             pre_img = preprocess_input(expand_img)

#             print(f"expand image : {expand_img.shape}")
#             print(f"pre image : {pre_img}")
            
#             # result = model.predict(pre_img)
#             result = model.predict(pre_img).flatten()
            
#             normalized = result/norm(result)
#             return normalized
        
#         feature_list.append(extract_feature(img_path=result_path, model=model2))
#         print(feature_list)
            
#         # Save updated data without removing previous data
#         with open('blueprints/bg_removal/featurevector2.pkl', 'ab') as fv_file:
#             pickle.dump(feature_list, fv_file)
#         with open('blueprints/bg_removal/filenames2.pkl', 'ab') as fn_file:
#             pickle.dump(filename, fn_file)

#         response_data = {
#             'resulting_mask_url': f"http://127.0.0.1:5000/processed-images/{filename_prefix}",
#             'resulting_cat_mask_url': f"http://127.0.0.1:5000/processed-cat-images/{filename_prefix}",
#             'masked_image_filename': image_filename, 
#         }

#         return response_data, 200
    
#     except Exception as e:
#         return {'error': str(e)}, 500

# # Add a route to serve the processed images
# @bg_removal_bp.route('/processed-images/<filename>')
# def processed_image(filename):
#     return send_from_directory(os.path.join(current_app.root_path, 'blueprints', 'bg_removal', 'processed-images'), filename)

# @bg_removal_bp.route('/processed-cat-images/<filename>')
# def processed_cat_image(filename):
#     return send_from_directory(os.path.join(current_app.root_path, 'blueprints', 'bg_removal', 'processed-cat-images'), filename)







import logging
import pickle
import random
from flask import Blueprint, Flask, current_app, request, send_file, send_from_directory, jsonify
from flask_cors import CORS
import os
import cv2
import numpy as np
import tensorflow as tf
from keras.utils import CustomObjectScope
from datetime import datetime
from keras.applications.resnet50 import ResNet50, preprocess_input
from keras.layers import GlobalMaxPool2D
import requests

from blueprints.save_features.save_features import upload_image



# Setup logging
logging.basicConfig(filename='error.log', level=logging.ERROR,
                    format='%(asctime)s:%(levelname)s:%(message)s')

# CREATING A BLUEPRINT
bg_removal_bp = Blueprint('bg_removal', __name__)

# UTILITY FUNCTIONS
def iou(y_true, y_pred):
    def f(y_true, y_pred):
        intersection = (y_true * y_pred).sum()
        union = y_true.sum() + y_pred.sum() - intersection
        x = (intersection + 1e-15) / (union + 1e-15)
        x = x.astype(np.float32)
        return x
    return tf.numpy_function(f, [y_true, y_pred], tf.float32)

def dice_coef(y_true, y_pred):
    y_true = tf.keras.layers.Flatten()(y_true)
    y_pred = tf.keras.layers.Flatten()(y_pred)
    intersection = tf.reduce_sum(y_true * y_pred)
    return (2. * intersection + 1e-15) / (tf.reduce_sum(y_true) + tf.reduce_sum(y_pred) + 1e-15)

def dice_loss(y_true, y_pred):
    return 1.0 - dice_coef(y_true, y_pred)

def create_dir(path):
    if not os.path.exists(path):
        os.makedirs(path)

def generate_masked_image(image_path, model, W, H):
    # Reading the image
    image = cv2.imread(image_path, cv2.IMREAD_COLOR)
    h, w, _ = image.shape
    x = cv2.resize(image, (W, H))
    x = x / 255.0
    x = x.astype(np.float32)
    x = np.expand_dims(x, axis=0)

    # Prediction
    y = model.predict(x)[0]
    y = cv2.resize(y, (w, h))
    y = np.expand_dims(y, axis=-1)

    # Save the resulting masked image
    masked_image = image * y

    return masked_image, image

# Image dimensions
H = 512
W = 512

# Seeding
np.random.seed(42)
tf.random.set_seed(42)

# Creating directory for storing files if not already created

create_dir("blueprints/bg_removal/processed-images")

# Loading model
with CustomObjectScope({'iou': iou, 'dice_coef': dice_coef, 'dice_loss': dice_loss}):
    model = tf.keras.models.load_model("blueprints/bg_removal/files/model.h5")






# IMAGE BACKGROUND REMOVAL ROUTE
@bg_removal_bp.route('/process_image', methods=['POST'])
def process_image():
    try:
        # Save the received image to the test_images/image directory
        image_file, user_id, remove_bg = request.files['productImage'], request.form.get('userId'), request.form.get('isRemoveBgChecked')

        random_number = random.randint(100000, 999999)
        current_date = datetime.now().strftime('%Y-%m-%d_%H-%M-%S')

        # image_filename = user id + unique identifier + date & time
        image_filename = f"{user_id}_{random_number}_{current_date}.png"
        image_path = os.path.join("blueprints/bg_removal/processed-images", image_filename)
        image_file.save(image_path)

        if remove_bg == "false":
            imagee = cv2.imread(image_path)
            cv2.imshow("Frame", imagee)
            cv2.waitKey(0)
            response_data = {
                'image_url': f"http://127.0.0.1:5000/processed-images/{image_filename}",
                'image_filename': image_filename,  # Added image filename
            }
            return response_data, 200

        # Generate masked image
        masked_image, image = generate_masked_image(image_path, model, W, H)
        
        # Generate the filename with userId_prefix_filename
        filename_prefix = f"{user_id}_{random_number}_{current_date}.png"

        # cat_images = np.concatenate([image, line, masked_image], axis=1)
        cat_images = np.concatenate([image, masked_image], axis=1)
        result_path = os.path.join("blueprints/bg_removal/processed-images", f"{filename_prefix}")
        result_cat_path = os.path.join("blueprints/bg_removal/processed-cat-images", f"{filename_prefix}")

        cv2.imwrite(result_path, masked_image)
        cv2.imwrite(result_cat_path, cat_images)
 
            
        response_data = {
            'resulting_mask_url': f"http://127.0.0.1:5000/processed-images/{filename_prefix}",
            'resulting_cat_mask_url': f"http://127.0.0.1:5000/processed-cat-images/{filename_prefix}",
            'masked_image_filename': image_filename,
        }
        
        upload_image(image_path= result_path)


        return response_data, 200

    except Exception as e:
        logging.error(f"Error in process_image function: {e}")
        return {'error': str(e)}, 500

# Add a route to serve the processed images
@bg_removal_bp.route('/processed-images/<filename>')
def processed_image(filename):
    return send_from_directory(os.path.join(current_app.root_path, 'blueprints', 'bg_removal', 'processed-images'), filename)

@bg_removal_bp.route('/processed-cat-images/<filename>')
def processed_cat_image(filename):
    return send_from_directory(os.path.join(current_app.root_path, 'blueprints', 'bg_removal', 'processed-cat-images'), filename)

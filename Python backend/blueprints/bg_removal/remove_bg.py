import logging
from PIL import Image

import random
from flask import Blueprint, Flask, current_app, request, send_file, send_from_directory, jsonify
from flask_cors import CORS
import os
import cv2
import numpy as np
import tensorflow as tf
from tensorflow.keras.utils import CustomObjectScope # type: ignore
from datetime import datetime
from keras.applications.resnet50 import ResNet50, preprocess_input # type: ignore
from keras.layers import GlobalMaxPool2D # type: ignore
import requests

from blueprints.save_features.save_features import upload_image



# Setup logging
logging.basicConfig(filename='error.log', level=logging.ERROR,
                    format='%(asctime)s:%(levelname)s:%(message)s')

# CREATING A BLUEPRINT
bg_removal_bp = Blueprint('bg_removal', __name__)


def create_dir(path):
    if not os.path.exists(path):
        os.makedirs(path)
# Seeding
np.random.seed(42)
tf.random.set_seed(42)

# Creating directory for storing files if not already created

create_dir("blueprints/bg_removal/processed-images")
create_dir("blueprints/bg_removal/processed-cat-images")
create_dir("blueprints/bg_removal/original-images")

# Loading model
# with CustomObjectScope({'iou': iou, 'dice_coef': dice_coef, 'dice_loss': dice_loss}):
#     model = tf.keras.models.load_model("blueprints/bg_removal/files/model.h5")



def remove_bg_api(image_path, masked_imaged_path):
    try:
        with open(image_path, 'rb') as image_file:
            response = requests.post(
                'https://api.remove.bg/v1.0/removebg',
                files={'image_file': image_file},
                data={'size': 'auto'},
                headers={'X-Api-Key': 'SW96zQXSL1uKmBNZwhPfetSp'},
            )
            if response.status_code == requests.codes.ok:
                output_image_path = masked_imaged_path
                with open(output_image_path, 'wb') as out:
                    out.write(response.content)
                return output_image_path
            else:
                raise Exception(f"Error: {response.status_code}, {response.text}")
    except Exception as e:
        print(f"Error in remove_bg_api: {e}")
        return None

@bg_removal_bp.route('/process_image', methods=['POST'])
def process_image():
    try:
        print(1)
        # Save the received image to the test_images/image directory
        image_file = request.files['productImage']
        user_id = request.form.get('userId')
        remove_bg = request.form.get('isRemoveBgChecked')

        random_number = random.randint(100000, 999999)
        current_date = datetime.now().strftime('%Y-%m-%d_%H-%M-%S')
        image_filename = f"{user_id}_{random_number}_{current_date}.png"
        
        original_image_path = os.path.join("blueprints/bg_removal/original-images", image_filename)
        masked_image_path = os.path.join("blueprints/bg_removal/processed-images", image_filename)
        cat_image_path = os.path.join("blueprints/bg_removal/processed-cat-images", image_filename)
        
        print(2)
        image_file.save(original_image_path)
        
        original_image = cv2.imread(original_image_path)
        if original_image is None:
            raise Exception("Original image not loaded correctly.")

        if remove_bg == "false":
            print(3)
            cv2.imwrite(masked_image_path, original_image)
            response_data = {
                'image_url': f"http://127.0.0.1:5000/processed-images/{image_filename}",
                'image_filename': image_filename,  # Added image filename
            }
            upload_image(image_path=original_image_path)
            return response_data, 200

        print(4)
        # Generate masked image
        masked_image_path = remove_bg_api(original_image_path, masked_image_path)
        print(f"masked image path: {masked_image_path}")
        print(6)
        if masked_image_path is None:
            raise Exception("Failed to process the image with the background removal API.")

       
        # Load the masked image
        masked_image = cv2.imread(masked_image_path, cv2.IMREAD_UNCHANGED)
        if masked_image is None:
            print("could not load masked image")  # Print a small part of the image array for debugging
            raise Exception("Masked image is empty or not loaded correctly.")
            
        original_image = cv2.cvtColor(original_image, cv2.COLOR_RGB2RGBA)
        
        # Concatenate original and masked images
        print('original Image Height is: ',original_image.shape[0])
        print('original Image Width is: ',original_image.shape[1])
        print('original Image shape is: ',original_image.shape)
        print('original Image data type is: ',original_image.dtype)
        print('masked Image height is: ',masked_image.shape[0])
        print('masked Image Width is: ',masked_image.shape[1])
        print('masked Image shape is: ',masked_image.shape)
        print('masked Image data type is: ',masked_image.dtype)
        print("original image dimension: ", original_image.shape[:2])
        print("masked image dimension: ", masked_image.shape[:2])
        
        # Ensure the masked image has the same size as the original image
        if original_image.shape[:2] != masked_image.shape[:2]:
            masked_image = cv2.resize(masked_image, (original_image.shape[1], original_image.shape[0]))
            print("masked image dimensiton after conversion: ",masked_image.shape[:2])
            
        # cat_images = np.concatenate([original_image, masked_image], axis=1)
        print("before concat")
        cat_images = cv2.hconcat([original_image, masked_image])
        print("after concat")
        
        # Save the masked and concatenated images
        print("before wiritng")
        cv2.imwrite(masked_image_path, masked_image)
        cv2.imwrite(cat_image_path, cat_images)
        print("after wiritng")
        
        print(6)

        response_data = {
            'resulting_mask_url': f"http://127.0.0.1:5000/processed-images/{image_filename}",
            'resulting_cat_mask_url': f"http://127.0.0.1:5000/processed-cat-images/{image_filename}",
            'masked_image_filename': image_filename,
        }
        
        print("before upload image")
        upload_image(image_path=masked_image_path)

        return response_data, 200

    except Exception as e:
        logging.error(f"Error in process_image function: {e}")
        return {'error': str(e)}, 500


# Add a route to serve the processed images
@bg_removal_bp.route('/original-images/<filename>')
def original_image(filename):
    return send_from_directory(os.path.join(current_app.root_path, 'blueprints', 'bg_removal', 'original-images'), filename)

@bg_removal_bp.route('/processed-images/<filename>')
def processed_image(filename):
    return send_from_directory(os.path.join(current_app.root_path, 'blueprints', 'bg_removal', 'processed-images'), filename)

@bg_removal_bp.route('/processed-cat-images/<filename>')
def processed_cat_image(filename):
    return send_from_directory(os.path.join(current_app.root_path, 'blueprints', 'bg_removal', 'processed-cat-images'), filename)















# # UTILITY FUNCTIONS
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

# def generate_masked_image(image_path, model, W, H):
#     # Reading the image
#     image = cv2.imread(image_path, cv2.IMREAD_COLOR)
#     h, w, _ = image.shape
#     x = cv2.resize(image, (W, H))
#     x = x / 255.0
#     x = x.astype(np.float32)
#     x = np.expand_dims(x, axis=0)

#     # Prediction
#     y = model.predict(x)[0]
#     y = cv2.resize(y, (w, h))
#     y = np.expand_dims(y, axis=-1)

#     # Save the resulting masked image
#     masked_image = image * y

#     return masked_image, image

# # Image dimensions
# H = 512
# W = 512


        # Generate masked image
        # masked_image, image = generate_masked_image(image_path, model, W, H)
        # cat_images = np.concatenate([image, line, masked_image], axis=1)
        # cat_images = np.concatenate([image, masked_image], axis=1)
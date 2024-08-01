from flask import Blueprint, jsonify, request
import sys
import os
import argparse
import cv2 as cv
import tqdm  # type: ignore


image_verification_bp = Blueprint('/verify_image', __name__)

# Default values for features distance and minimum matches
DEFAULT_FEATURES_DISTANCE = 0.3
DEFAULT_MIN_MATCHES = 20

def collect_imgs(directory):
    """
    Collect images in directory.
    """
    
    imgs = []
    for file in os.listdir(directory):
        if file.lower().endswith(('.png', '.jpg', '.jpeg', '.tiff', '.bmp', '.webp', '.ico', '.jfif', '.svg', '.heif', '.heic')):
            path = os.path.join(directory, file)
            imgs.append({
                'f': cv.imread(path, cv.IMREAD_GRAYSCALE),
                'p': path
            })
    return imgs

def detect_features(imgs):
    """
    Detect and compute features and descriptors.
    """
    sift = cv.SIFT_create()
    for img in imgs:
        img['kp'], img['des'] = sift.detectAndCompute(img['f'], None)
    return imgs

def find_matches (imgs, i1, i2):
    FLANN_INDEX_KDTREE = 1
    index_params = dict(
        algorithm=FLANN_INDEX_KDTREE,
        trees=5
    )
    search_params = dict(checks=50)
    flann = cv.FlannBasedMatcher(index_params, search_params)
    matches = flann.knnMatch(imgs[i1]['des'], imgs[i2]['des'], k=2)
    return matches

def similarity_check(imgs, userId):
    """
    Checks similarity.
    """
    duplicates = []
    for i1 in range(len(imgs)):
        
        print("-----------------------------------------------------------")
        print(os.path.basename(imgs[i1]['p']).startswith(userId))
        print(os.path.basename(imgs[i1]['p']))
        # if os.path.basename(imgs[i1]['p']).startswith(userId) == True:
        for i2 in range(i1 + 1, len(imgs)):
        # for i2 in range(i1, len(imgs)):
            print('inner loop running')
            
            matches = find_matches( imgs, i1, i2)
            matchesCount = 0
            for i, (m, n) in enumerate(matches):
                if m.distance < DEFAULT_FEATURES_DISTANCE * n.distance:
                    matchesCount += 1
            print(matchesCount)
            if matchesCount > DEFAULT_MIN_MATCHES:
                # h1, w1 = imgs[i1]['f'].shape[:2]
                # h2, w2 = imgs[i2]['f'].shape[:2]
                # duplicates.append(imgs[i2 if h1 * w1 > h2 * w2 else i1]['p'])
                duplicates.append(imgs[i1]['p'])
                duplicates.append(imgs[i2]['p'])
                print("appending duplicate")
    
        print("-----------------------------------------------------------")
    return duplicates
    

# image detection route
@image_verification_bp.route('/verify_images')
def index():
    try:
        user_id = request.args.get('userId')
        print(f"user id :{user_id}")
    
        imgs = collect_imgs(directory='blueprints/bg_removal/processed-images/')
        
        features = detect_features(imgs)

        duplicates = similarity_check(features, userId=user_id)
        # print(f'{duplicates}')
        
        # for idx, path in enumerate(list(set(duplicates)), 1):
            # print(f"{idx}. {path}")
        
        duplicates = list(set(duplicates))
        
        duplicates_data = [{'index': idx, 'path': os.path.basename(path)} for idx, path in enumerate(duplicates, 1)]
        
        # print(f'duplicates data: {duplicates_data}')
#
        return jsonify({'duplicates': duplicates_data})
        
    except Exception as e:
        return jsonify({'error': str(e)})



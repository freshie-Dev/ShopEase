import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from blueprints.bg_removal.remove_bg import bg_removal_bp
from blueprints.image_verification.image_verification import image_verification_bp
from blueprints.image_search.image_search import image_search_bp


app = Flask(__name__)
CORS(app)

app.register_blueprint(bg_removal_bp)
app.register_blueprint(image_verification_bp)
app.register_blueprint(image_search_bp)



@app.route('/delete_image', methods=['POST'])
def delete_image():
    deleted_product_key = request.json.get('deleted_product_key')
    if deleted_product_key:
        image_path = os.path.join('blueprints', 'bg_removal', 'processed-images', deleted_product_key)
        if os.path.exists(image_path):
            os.remove(image_path)
            return jsonify({'message': 'Image deleted successfully'})
        else:
            return jsonify({'message': 'Image not found'}), 404
    else:
        return jsonify({'message': 'Missing deleted_product_key'}), 400

if __name__ == '__main__':
    app.run(debug=False, use_reloader=False)
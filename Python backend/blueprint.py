from flask import Flask
from flask_cors import CORS
from blueprints.bg_removal.remove_bg import bg_removal_bp
from blueprints.image_verification.image_verification import image_verification_bp
from blueprints.image_search.image_search import image_search_bp


app = Flask(__name__)
CORS(app)

app.register_blueprint(bg_removal_bp)
app.register_blueprint(image_verification_bp)
app.register_blueprint(image_search_bp)




if __name__ == '__main__':
    app.run(debug=True)
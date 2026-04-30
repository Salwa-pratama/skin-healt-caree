from flask import Flask
from flask_cors import CORS
from controller.cnn_acne_controller import cnn_route

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return {"message" : "Machine learning API is ready"}


# Routing controller
app.register_blueprint(cnn_route, url_prefix="/api")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000", debug=True)

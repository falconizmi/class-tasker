from flask import Flask
from flask_cors import CORS, cross_origin
import json

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"


@app.route("/api", methods=["GET"])
def index():
    return [
        {"task": "hw1"},
        {"task": "seminr"},
        {"task": "test"},
    ]


if __name__ == "__main__":
    app.run(debug=True)

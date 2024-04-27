from flask import Flask
import json

app = Flask(__name__)

@app.route("/api", methods=["GET"])
def index():
    return "halloo"# json.dumps({'name': 'Hello World'})

if __name__ == "__main__":
    app.run(debug=True)
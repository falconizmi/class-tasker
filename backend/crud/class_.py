from flask import Blueprint, jsonify, request

from config import db
from models import Class

class_bp = Blueprint('class', __name__)

@class_bp.route("/", methods=["GET"])
def get_classes():
    classes = Class.query.all()
    json_classes = list(map(lambda x: x.to_json(), classes))
    return jsonify({"classes": json_classes})

@class_bp.route("/", methods=["POST"])
def create_class():
    name = request.json.get("name")
    code = request.json.get("code")

    if not name or not code:
        return jsonify({"message": "You must include a name and code"}), 400

    new_class = Class(name=name, code=code)
    try:
        db.session.add(new_class)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "User created new class"}), 201

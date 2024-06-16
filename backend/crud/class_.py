from flask import Blueprint, jsonify, request
from uuid import UUID

from config import db
from models import Class
from utils import login_required

class_bp = Blueprint('class', __name__)

@class_bp.route("/", methods=["GET"])
@login_required
def get_classes():
    classes = Class.query.all()
    json_classes = list(map(lambda x: x.to_json(), classes))
    return jsonify({"classes": json_classes})

@class_bp.route("/", methods=["POST"])
@login_required
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

@class_bp.route("/<uuid:class_id>", methods=["PATCH"])
@login_required
def update_class(class_id: UUID):
    class_ = Class.query.get(class_id)

    if not class_:
        return jsonify({"message": "Class not found"}), 404
    data = request.json
    class_.name = data.get("name", class_.name)
    class_.code = data.get("code", class_.code)

    db.session.commit()

    return jsonify({"message": "Class updated"}), 200


@class_bp.route("/<uuid:class_id>", methods=["DELETE"])
@login_required
def delete_class(class_id: UUID):
    class_ = Class.query.get(class_id)

    if not class_:
        return jsonify({"message": "Class not found"}), 404

    db.session.delete(class_)
    db.session.commit()

    return jsonify({"message": "Class deleted!"}), 200
from flask import Blueprint, jsonify, request
from uuid import UUID

from config import db
from models import Class, User
from utils import login_required

class_bp = Blueprint('class', __name__)

@class_bp.route("/", methods=["GET"])
@login_required
def get_classes():
    classes = Class.query.all()
    json_classes = list(map(lambda x: x.to_json(), classes))
    return jsonify({"classes": json_classes})

@class_bp.route("/user/<uuid:user_id>", methods=["GET"])
@login_required
def get_user_classes(user_id: UUID):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404

    json_classes = list(map(lambda x: x.to_json(), user.classes))
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

@class_bp.route("/join", methods=["POST"])
@login_required
def join_class():
    user_id = request.json.get("user_id")
    code = request.json.get("code")

    if not user_id or not code:
        return jsonify({"message": "You must include a user_id and code"}), 400

    user = User.query.get(UUID(user_id))
    class_ = Class.query.filter_by(code=code).first()

    if not user:
        return jsonify({"message": "User not found"}), 404

    if not class_:
        return jsonify({"message": "Class not found"}), 404

    # Check if the user is already enrolled in the class
    if class_ in user.classes:
        return jsonify({"message": "User is already enrolled in this class"}), 400

    user.classes.append(class_)
    db.session.commit()

    return jsonify({"message": "User successfully joined the class"}), 200


@class_bp.route("/leave", methods=["POST"])
@login_required
def leave_class():
    user_id = request.json.get("user_id")
    class_id = request.json.get("class_id")

    if not user_id or not class_id:
        return jsonify({"message": "You must include a user_id and class_id"}), 400

    user = User.query.get(UUID(user_id))
    class_ = Class.query.get(UUID(class_id))

    if not user:
        return jsonify({"message": "User not found"}), 404

    if not class_:
        return jsonify({"message": "Class not found"}), 404

    # Check if the user is enrolled in the class
    if class_ not in user.classes:
        return jsonify({"message": "User is not enrolled in this class"}), 400

    user.classes.remove(class_)
    db.session.commit()

    return jsonify({"message": "User successfully left the class"}), 200

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
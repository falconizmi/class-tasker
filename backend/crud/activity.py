from flask import Blueprint, jsonify, request
from uuid import UUID

from config import db
from models import Activity
from utils import login_required, from_js_isoformat

activity_bp = Blueprint('activity', __name__)

@activity_bp.route("/", methods=["GET"])
@login_required
def get_activities():
    activities = Activity.query.all()
    json_activities = list(map(lambda x: x.to_json(), activities))
    return {"activities": json_activities}

@activity_bp.route("/", methods=["POST"])
@login_required
def create_activity():
    name = request.json.get("name")
    description = request.json.get("description")
    date = from_js_isoformat(request.json.get("date"))
    activity_type = request.json.get("activityType")
    class_id = request.json.get("classId")

    if not name or not activity_type or not class_id:
        return jsonify({"message": "You must include a name and activity type, and class ID"}), 400

    try:
        # Ensure that class_id is a valid UUID
        class_id = UUID(class_id)

        # Create a new Activity instance
        new_activity = Activity(
            name=name,
            description=description,
            date=date,
            activity_type=activity_type,
            class_id=class_id
        )

        # Add to the session and commit
        db.session.add(new_activity)
        db.session.commit()
    except ValueError as ve:
        # Handle the case where class_id is not a valid UUID
        return jsonify({"message": f"Invalid class ID: {ve}"}), 400
    except Exception as e:
        # General exception handling
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "User created new activity"}), 201

@activity_bp.route("/<uuid:activity_id>", methods=["PATCH"])
@login_required
def update_activity(activity_id: UUID):
    activity = Activity.query.get(activity_id)

    if not activity:
        return jsonify({"message": "Activity not found"}), 404
    data = request.json
    activity.name = data.get("name", activity.name)
    activity.description = data.get("description", activity.description)
    activity.date = from_js_isoformat(data.get("date", activity.date.isoformat()))
    activity.activity_type = data.get("activityType", activity.activity_type)
    activity.class_id = data.get("classId", activity.class_id)

    db.session.commit()

    return jsonify({"message": "Activity updated"}), 200

@activity_bp.route("/<uuid:activity_id>", methods=["DELETE"])
@login_required
def delete_activity(activity_id: UUID):
    activity = Activity.query.get(activity_id)

    if not activity:
        return jsonify({"message": "Activity not found"}), 404

    db.session.delete(activity)
    db.session.commit()

    return jsonify({"message": "Activity deleted!"}), 200
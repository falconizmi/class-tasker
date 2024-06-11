from datetime import datetime
from flask import Blueprint, jsonify, request

from config import db
from models import Activity
import utils

activity_bp = Blueprint('activity', __name__)

@activity_bp.route("/", methods=["GET"])
def get_activities():
    activities = Activity.query.all()
    json_activities = list(map(lambda x: x.to_json(), activities))
    return {"activities": json_activities}

@activity_bp.route("/", methods=["POST"])
def create_activity():
    name = request.json.get("name")
    description = request.json.get("description")
    date = utils.from_js_isoformat(request.json.get("date"))
    activity_type = request.json.get("activityType")

    if not name or not activity_type:
        return jsonify({"message": "You must include a name and activity type"}), 400

    new_activity = Activity(
        name=name, description=description, date=date, activity_type=activity_type
    )
    try:
        db.session.add(new_activity)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "User created new activity"}), 201

@activity_bp.route("/<int:activity_id>", methods=["PATCH"])
def update_activity(activity_id):
    activity = Activity.query.get(activity_id)

    if not activity:
        return jsonify({"message": "Activity not found"}), 404
    data = request.json
    activity.name = data.get("name", activity.name)
    activity.description = data.get("description", activity.description)
    activity.date = datetime.fromisoformat(data.get("date", activity.date))
    activity.activity_type = data.get("activityType", activity.activity_type)

    db.session.commit()

    return jsonify({"message": "Activity updated"}), 200

@activity_bp.route("/<int:activity_id>", methods=["DELETE"])
def delete_activity(activity_id):
    activity = Activity.query.get(activity_id)

    if not activity:
        return jsonify({"message": "Activity not found"}), 404

    db.session.delete(activity)
    db.session.commit()

    return jsonify({"message": "User deleted!"}), 200
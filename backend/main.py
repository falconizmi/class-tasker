from flask import jsonify, request

from config import app, db
from models import Activity, Class

import utils


@app.route("/home", methods=["GET"])
def get_activities():
    activities = Activity.query.all()
    json_activities = list(map(lambda x: x.to_json(), activities))
    return jsonify({"activities": json_activities})


@app.route("/create_activity", methods=["POST"])
def create_activity():
    name = request.json.get("name")
    description = request.json.get("decription")
    date = request.json.get("date")
    activity_type = request.json.get("activityType")

    if not name or not activity_type:
        return (
            jsonify({"message": "You must include a name and activity type"}),
            400,
        )

    new_activity = Activity(
        name=name, description=description, date=utils.get_datetime_from_string(date), activity_type=activity_type
    )
    try:
        db.session.add(new_activity)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "User created new activity"}), 201


@app.route("/update_activity/<int:activity_id>", methods=["PATCH"])
def update_activity(activity_id):
    activity: Activity = Activity.query.get(activity_id)

    if not activity:
        return jsonify({"message": "Activity not found"}), 404
    data = request.json
    activity.name = data.get("name", activity.name)
    activity.description = data.get("description", activity.description)
    activity.date = utils.get_datetime_from_string(data.get("date", activity.date))
    activity.activity_type = data.get("activityType", activity.activity_type)

    db.session.commit()

    return jsonify({"message": "Activity updated"}), 200


@app.route("/delete_activity/<int:activity_id>", methods=["DELETE"])
def delete_activity(activity_id):
    activity: Activity = Activity.query.get(activity_id)

    if not activity:
        return jsonify({"message": "Activity not found"}), 404

    db.session.delete(activity)
    db.session.commit()

    return jsonify({"message": "user deleted!"}), 200


@app.route("/class", methods=["GET"])
def get_classes():
    classes = Class.query.all()
    json_classes = list(map(lambda x: x.to_json(), classes))
    return jsonify({"classes": json_classes})


@app.route("/create_class", methods=["POST"])
def create_class():
    name = request.json.get("name")
    code = request.json.get("code")

    if not name or not code:
        return (
            jsonify({"message": "You must include a name and code"}),
            400,
        )

    new_class = Class(name=name, code=code)
    try:
        db.session.add(new_class)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "User created new class"}), 201


if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)

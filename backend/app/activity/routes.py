import uuid
from flask import Blueprint, jsonify, request
from sqlalchemy import select

from app.db.session import SessionLocal
from app.activity.models import Activity, ActivityType
from app.activity.schemas import ActivityCreate, ActivityRead
from app.classroom.models import Classroom
from app.utils import login_required

from app.activity import activity_bp

# LIST all activities
@activity_bp.route('', methods=['GET', 'OPTIONS'])
@login_required
def get_activities():
    if request.method == 'OPTIONS':
        return '', 200
    with SessionLocal() as session:
        acts = session.execute(select(Activity)).scalars().all()
        data = [ActivityRead.model_validate(a).model_dump() for a in acts]
    return jsonify({'status': 'success', 'data': data}), 200

# LIST activities for a classroom
@activity_bp.route('/class/<id>', methods=['GET', 'OPTIONS'])
@login_required
def get_class_activities(id: str):
    if request.method == 'OPTIONS':
        return '', 200
    try:
        cid = uuid.UUID(id)
    except ValueError:
        return jsonify({'status': 'fail', 'message': 'Invalid UUID'}), 400
    with SessionLocal() as session:
        room = session.get(Classroom, cid)
        if not room:
            return jsonify({'status': 'fail', 'message': 'Class not found'}), 404
        data = [ActivityRead.model_validate(a).model_dump() for a in room.activities]
    return jsonify({'status': 'success', 'data': data}), 200

# GET single activity
@activity_bp.route('/<id>', methods=['GET', 'OPTIONS'])
@login_required
def get_activity(id: str):
    if request.method == 'OPTIONS':
        return '', 200
    try:
        aid = uuid.UUID(id)
    except ValueError:
        return jsonify({'status': 'fail', 'message': 'Invalid UUID'}), 400
    with SessionLocal() as session:
        act = session.get(Activity, aid)
        if not act:
            return jsonify({'status': 'fail', 'message': 'Activity not found'}), 404
        data = ActivityRead.model_validate(act).model_dump()
    return jsonify({'status': 'success', 'data': data}), 200

# CREATE activity
@activity_bp.route('', methods=['POST', 'OPTIONS'])
@login_required
def create_activity():
    if request.method == 'OPTIONS':
        return '', 200
    payload = request.get_json()
    try:
        a = ActivityCreate(**payload)
    except Exception as e:
        return jsonify({'status': 'fail', 'message': str(e)}), 400
    new_act = Activity(
        name=a.name,
        description=a.description,
        date=a.date,
        activity_type=a.activity_type,
        classroom_id=a.classroom_id,
    )
    with SessionLocal() as session:
        session.add(new_act)
        session.commit()
        session.refresh(new_act)
        data = ActivityRead.model_validate(new_act).model_dump()
    return jsonify({'status': 'success', 'data': data}), 201

# UPDATE activity
@activity_bp.route('/<id>', methods=['PATCH', 'PUT', 'OPTIONS'])
@login_required
def update_activity(id: str):
    if request.method == 'OPTIONS':
        return '', 200
    try:
        aid = uuid.UUID(id)
    except ValueError:
        return jsonify({'status': 'fail', 'message': 'Invalid UUID'}), 400
    payload = request.get_json()
    with SessionLocal() as session:
        act = session.get(Activity, aid)
        if not act:
            return jsonify({'status': 'fail', 'message': 'Activity not found'}), 404
        if 'name' in payload:
            act.name = payload['name']
        if 'description' in payload:
            act.description = payload['description']
        if 'date' in payload:
            act.date = payload['date']
        if 'activityType' in payload:
            act.activity_type = ActivityType[payload['activityType']]
        if 'classroomId' in payload:
            act.classroom_id = uuid.UUID(payload['classroomId'])
        session.commit()
        session.refresh(act)
        data = ActivityRead.model_validate(act).model_dump()
    return jsonify({'status': 'success', 'data': data}), 200

# DELETE activity
@activity_bp.route('/<id>', methods=['DELETE', 'OPTIONS'])
@login_required
def delete_activity(id: str):
    if request.method == 'OPTIONS':
        return '', 200
    try:
        aid = uuid.UUID(id)
    except ValueError:
        return jsonify({'status': 'fail', 'message': 'Invalid UUID'}), 400
    with SessionLocal() as session:
        act = session.get(Activity, aid)
        if not act:
            return jsonify({'status': 'fail', 'message': 'Activity not found'}), 404
        session.delete(act)
        session.commit()
    return jsonify({'status': 'success', 'data': {'message': 'Activity deleted'}}), 200

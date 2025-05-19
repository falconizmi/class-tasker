import uuid
from flask import Blueprint, jsonify, request
from sqlalchemy import select

from app.db.session import SessionLocal
from app.classroom.models import Classroom
from app.classroom.schemas import ClassroomCreate, ClassroomRead
from app.user.models import User
from app.utils import login_required

from app.classroom import classroom_bp

# LIST all classrooms
@classroom_bp.route('', methods=['GET', 'OPTIONS'])
@login_required
def get_classrooms():
    if request.method == 'OPTIONS':
        return '', 200
    with SessionLocal() as session:
        rooms = session.execute(select(Classroom)).scalars().all()
        data = [ClassroomRead.model_validate(r).model_dump() for r in rooms]
    return jsonify({'status': 'success', 'data': data}), 200

# LIST classes for a user
@classroom_bp.route('/user/<id>', methods=['GET', 'OPTIONS'])
@login_required
def get_user_classes(id: str):
    if request.method == 'OPTIONS':
        return '', 200
    try:
        user_id = uuid.UUID(id)
    except ValueError:
        return jsonify({'status': 'fail', 'message': 'Invalid UUID'}), 400
    with SessionLocal() as session:
        user = session.get(User, user_id)
        if not user:
            return jsonify({'status': 'fail', 'message': 'User not found'}), 404
        data = [ClassroomRead.model_validate(c).model_dump() for c in user.classrooms]
    return jsonify({'status': 'success', 'data': data}), 200

# CREATE classroom
@classroom_bp.route('', methods=['POST', 'OPTIONS'])
@login_required
def create_classroom():
    if request.method == 'OPTIONS':
        return '', 200
    payload = request.get_json()
    try:
        c = ClassroomCreate(**payload)
    except Exception as e:
        return jsonify({'status': 'fail', 'message': str(e)}), 400
    new_room = Classroom(name=c.name, code=c.code)
    with SessionLocal() as session:
        session.add(new_room)
        session.commit()
        session.refresh(new_room)
        data = ClassroomRead.model_validate(new_room).model_dump()
    return jsonify({'status': 'success', 'data': data}), 201

# JOIN a classroom
@classroom_bp.route('/join', methods=['POST', 'OPTIONS'])
@login_required
def join_classroom():
    if request.method == 'OPTIONS':
        return '', 200
    payload = request.get_json()
    user_id = payload.get('userId') or payload.get('user_id')
    code = payload.get('code')
    if not user_id or not code:
        return jsonify({'status': 'fail', 'message': 'userId and code required'}), 400
    try:
        uid = uuid.UUID(user_id)
    except ValueError:
        return jsonify({'status': 'fail', 'message': 'Invalid UUID'}), 400
    with SessionLocal() as session:
        user = session.get(User, uid)
        room = session.execute(select(Classroom).where(Classroom.code == code)).scalars().first()
        if not user or not room:
            return jsonify({'status': 'fail', 'message': 'User or class not found'}), 404
        if room in user.classrooms:
            return jsonify({'status': 'fail', 'message': 'Already enrolled'}), 400
        user.classrooms.append(room)
        session.commit()
        data = ClassroomRead.model_validate(room).model_dump()
    return jsonify({'status': 'success', 'data': data}), 200

# LEAVE a classroom
@classroom_bp.route('/leave', methods=['POST', 'OPTIONS'])
@login_required
def leave_classroom():
    if request.method == 'OPTIONS':
        return '', 200
    payload = request.get_json()
    user_id = payload.get('userId') or payload.get('user_id')
    code = payload.get('code')
    if not user_id or not code:
        return jsonify({'status': 'fail', 'message': 'userId and code required'}), 400
    try:
        uid = uuid.UUID(user_id)
    except ValueError:
        return jsonify({'status': 'fail', 'message': 'Invalid UUID'}), 400
    with SessionLocal() as session:
        user = session.get(User, uid)
        room = session.execute(select(Classroom).where(Classroom.code == code)).scalars().first()
        if not user or not room:
            return jsonify({'status': 'fail', 'message': 'User or class not found'}), 404
        if room not in user.classrooms:
            return jsonify({'status': 'fail', 'message': 'Not enrolled in this class'}), 400
        user.classrooms.remove(room)
        session.commit()
    return jsonify({'status': 'success', 'data': {'message': 'Left classroom'}}), 200

# UPDATE classroom
@classroom_bp.route('/<id>', methods=['PATCH', 'PUT', 'OPTIONS'])
@login_required
def update_classroom(id: str):
    if request.method == 'OPTIONS':
        return '', 200
    try:
        cid = uuid.UUID(id)
    except ValueError:
        return jsonify({'status': 'fail', 'message': 'Invalid UUID'}), 400
    payload = request.get_json()
    with SessionLocal() as session:
        room = session.get(Classroom, cid)
        if not room:
            return jsonify({'status': 'fail', 'message': 'Class not found'}), 404
        if 'name' in payload:
            room.name = payload['name']
        if 'code' in payload:
            room.code = payload['code']
        session.commit()
        session.refresh(room)
        data = ClassroomRead.model_validate(room).model_dump()
    return jsonify({'status': 'success', 'data': data}), 200

# DELETE classroom
@classroom_bp.route('/<id>', methods=['DELETE', 'OPTIONS'])
@login_required
def delete_classroom(id: str):
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
        session.delete(room)
        session.commit()
    return jsonify({'status': 'success', 'data': {'message': 'Class deleted'}}), 200
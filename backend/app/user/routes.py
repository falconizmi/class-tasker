import uuid
from flask import Blueprint, jsonify, request
from sqlalchemy import select

from app.db.session import SessionLocal
from app.user.models import User, UserType
from app.user.schemas import UserCreate, UserOut, UserRead
from app.utils import login_required

from app.user import user_bp

# LIST all users
@user_bp.route('', methods=['GET', 'OPTIONS'])
@login_required
def get_users():
    if request.method == 'OPTIONS':
        return '', 200
    with SessionLocal() as session:
        users = session.execute(select(User)).scalars().all()
        data = [UserOut.model_validate(u).model_dump() for u in users]
        print(data)
    return jsonify({'status': 'success', 'data': data}), 200

# LIST students
@user_bp.route('/students', methods=['GET', 'OPTIONS'])
@login_required
def get_students():
    if request.method == 'OPTIONS':
        return '', 200
    with SessionLocal() as session:
        students = session.execute(select(User).where(User.user_type == UserType.student)).scalars().all()
        data = [UserOut.model_validate(u).model_dump() for u in students]
    return jsonify({'status': 'success', 'data': data}), 200

# LIST teachers
@user_bp.route('/teachers', methods=['GET', 'OPTIONS'])
@login_required
def get_teachers():
    if request.method == 'OPTIONS':
        return '', 200
    with SessionLocal() as session:
        teachers = session.execute(select(User).where(User.user_type == UserType.teacher)).scalars().all()
        data = [UserOut.model_validate(u).model_dump() for u in teachers]
    return jsonify({'status': 'success', 'data': data}), 200

# GET single user
@user_bp.route('/<id>', methods=['GET', 'OPTIONS'])
@login_required
def get_user(id: str):
    if request.method == 'OPTIONS':
        return '', 200
    try:
        user_id = uuid.UUID(id)
    except ValueError:
        return jsonify({'status': 'fail', 'message': 'Invalid UUID'}), 400
    with SessionLocal() as session:
        user = session.execute(select(User).where(User.id == user_id)).scalars().first()
        if not user:
            return jsonify({'status': 'fail', 'message': 'User not found'}), 404
        data = UserOut.model_validate(user).model_dump()
    return jsonify({'status': 'success', 'data': data}), 200

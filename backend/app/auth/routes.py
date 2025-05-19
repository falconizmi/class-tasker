from flask import Blueprint, request, jsonify, session
import uuid
from sqlalchemy import select
from app.db.session import SessionLocal
from app.user.models import User, UserType
from app.user.schemas import UserCreate, UserOut, UserRead
from app.extensions import bcrypt

from app.auth import auth_bp

@auth_bp.route('/register', methods=['POST', 'OPTIONS'])
def register():
    if request.method == 'OPTIONS':
        return '', 200
    data = request.get_json()
    try:
        u = UserCreate(**data)
    except Exception as e:
        return jsonify({'status': 'fail', 'message': str(e)}), 400

    hashed_pw = bcrypt.generate_password_hash(u.password).decode('utf-8')
    new_user = User(
        first_name=u.first_name,
        last_name=u.last_name,
        email=u.email,
        password=hashed_pw,
        user_type=u.user_type.value,
    )
    with SessionLocal() as session_db:
        session_db.add(new_user)
        session_db.commit()
        session_db.refresh(new_user)
        payload = UserOut.model_validate(new_user).model_dump()
    return jsonify({'status': 'success', 'data': payload}), 201

@auth_bp.route('/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        return '', 200
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify({'status': 'fail', 'message': 'Email and password required'}), 400

    with SessionLocal() as session_db:
        stmt = select(User).where(User.email == email)
        user = session_db.execute(stmt).scalars().first()
    if user and bcrypt.check_password_hash(user.password, password):
        session['user_id'] = str(user.id)
        payload = UserOut.model_validate(user).model_dump()
        return jsonify({'status': 'success', 'data': payload}), 200
    return jsonify({'status': 'fail', 'message': 'Invalid credentials'}), 401

@auth_bp.route('/logout', methods=['POST', 'OPTIONS'])
def logout():
    if request.method == 'OPTIONS':
        return '', 200
    session.pop('user_id', None)
    return jsonify({'status': 'success', 'data': {'message': 'Logged out successfully'}}), 200

@auth_bp.route('/session', methods=['GET', 'OPTIONS'])
def check_session():
    if request.method == 'OPTIONS':
        return '', 200
    logged_in = 'user_id' in session
    return jsonify({'status': 'success', 'data': {'logged_in': logged_in}}), 200
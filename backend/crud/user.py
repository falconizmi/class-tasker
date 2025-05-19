from flask import Blueprint, jsonify, request
from uuid import UUID

from config import db
from models import User
from utils import login_required

user_bp = Blueprint('user', __name__)

@user_bp.route("/", methods=["GET"])
@login_required
def get_users():
    users = User.query.all()
    json_users = list(map(lambda x: x.to_json(), users))
    return {"users": json_users}

@user_bp.route("/students", methods=["GET"])
@login_required
def get_students():
    students = User.query.filter_by(userType="student").all()
    json_students = list(map(lambda x: x.to_json(), students))
    return {"students": json_students}

@user_bp.route("/teachers", methods=["GET"])
@login_required
def get_teachers():
    teachers = User.query.filter_by(userType="teacher").all()
    json_teachers = list(map(lambda x: x.to_json(), teachers))
    return {"teachers": json_teachers}
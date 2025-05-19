from flask import Blueprint

user_bp = Blueprint('user', __name__, url_prefix='/users')

from app.user import models, schemas, routes  # noqa: F401
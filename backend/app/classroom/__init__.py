from flask import Blueprint

classroom_bp = Blueprint('classroom', __name__, url_prefix='/classrooms')

from app.classroom import models, schemas, routes  # noqa: F401
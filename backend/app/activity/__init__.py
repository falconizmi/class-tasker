from flask import Blueprint

activity_bp = Blueprint("activity", __name__, url_prefix="/activities")

from app.activity import models, schemas, routes  # noqa: F401
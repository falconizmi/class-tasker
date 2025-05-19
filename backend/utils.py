from datetime import datetime
from dateutil import parser
from functools import wraps
from flask import request, jsonify, session

def to_js_isoformat(dt: datetime) -> str:
    return (
        dt
        .isoformat(timespec="milliseconds")
        + "Z"
    )

def from_js_isoformat(datestring: str) -> datetime:
    return parser.parse(datestring)


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return jsonify({'message': 'Authentication is required'}), 401
        return f(*args, **kwargs)
    return decorated_function
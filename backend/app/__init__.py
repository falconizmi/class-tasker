import os

from flask import Flask, make_response, request
from flask_cors import CORS
from config import DevelopmentConfig, ProductionConfig
from app.db.session import engine

from app.db.base import Base
from app.db import models  # ensures models are registered
from app.extensions import bcrypt

def create_app():
    env = os.getenv("APP_ENV", "development")
    if env == "production":
        config = ProductionConfig()
    else:
        config = DevelopmentConfig()

    app = Flask(__name__)
    app.config.from_object(config)

    CORS(app, supports_credentials=True, resources={r"/*": {"origins": app.config["CORS_ORIGINS"]}})

    @app.before_request
    def _handle_options():
        if request.method == "OPTIONS":
            # return empty 204 so the browser sees a 2xx
            return make_response("", 204)

    bcrypt.init_app(app)

    # Import and register blueprints
    from app.activity import activity_bp
    app.register_blueprint(activity_bp, strict_slashes=False)

    from app.classroom import classroom_bp
    app.register_blueprint(classroom_bp, strict_slashes=False)

    from app.user import user_bp
    app.register_blueprint(user_bp, strict_slashes=False)

    from app.auth import auth_bp
    app.register_blueprint(auth_bp, strict_slashes=False)

    return app
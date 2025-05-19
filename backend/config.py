import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY", "defaultsecret")
    # CORS_ORIGINS = os.environ.get("CORS_ORIGINS", "*") # TODO use this but instad *, put the page domain
    allowed_origins = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://yourfrontend.com",
    ]
    CORS_ORIGINS = allowed_origins

# TODO check the link below to setup heroku for remote datbase
# https://realpython.com/flask-by-example-part-1-project-setup/
# https://realpython.com/flask-by-example-part-2-postgres-sqlalchemy-and-alembic/
# or here to setup neon db
# https://neon.tech/guides/flask-database-migrations


class ProductionConfig(Config):
    DEBUG = False
    ENV = "production"
    DATABASE_URL = os.environ.get("DATABASE_URL")

class DevelopmentConfig(Config):
    DEBUG = True
    ENV = "development"
    DATABASE_URL = os.environ.get("DATABASE_URL")
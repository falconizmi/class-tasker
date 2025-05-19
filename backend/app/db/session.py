import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from config import DevelopmentConfig, ProductionConfig

env = os.getenv("APP_ENV", "development")
if env == "production":
    config = ProductionConfig()
else:
    config = DevelopmentConfig()

engine = create_engine(config.DATABASE_URL, echo=True, future=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
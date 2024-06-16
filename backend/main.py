from flask import Flask
from config import app, db

# Importing the blueprints
from crud.activity import activity_bp
from crud.class_ import class_bp
from auth.auth import auth_bp

# Register the blueprints
app.register_blueprint(activity_bp, url_prefix='/activities')
app.register_blueprint(class_bp, url_prefix='/classes')
app.register_blueprint(auth_bp, url_prefix='/auth')

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)
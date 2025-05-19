from app import create_app

app = create_app()
    
if __name__ == "__main__":
    app.run(port=8080)
    # TODO fix this host for production -> get a proper WSGI server (like gunicorn) and a reverse proxy (like Nginx).


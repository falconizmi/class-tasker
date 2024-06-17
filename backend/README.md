# migration repository

```bash
pipenv shell

export FLASK_APP=main.py

flask db init
flask db migrate -m "Initial migration"
flask db upgrade
```
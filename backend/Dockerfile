FROM python:3.12

WORKDIR /app

# Install pipenv
RUN pip install pipenv

COPY Pipfile Pipfile.lock ./
RUN pipenv install --deploy --system

COPY . .

ENV PYTHONUNBUFFERED=1

EXPOSE 8080

CMD ["python3", "main.py"]

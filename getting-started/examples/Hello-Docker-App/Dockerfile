FROM python:3.12-slim

WORKDIR /app
COPY . /app

RUN pip install rich pyfiglet

ENV NAME="World"

CMD ["python", "app.py"]

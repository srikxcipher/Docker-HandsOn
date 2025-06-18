# Project: Dockerized Django – Your First Containerized Web App

> “Take your **baby steps** into the world of containerized web apps — this is where Python meets Docker, and things start getting real.”

---

## Project Structure

```
.
└── README.md
└── docs
└── django-application
    ├── demoproject
    │   ├── asgi.py
    │   ├── __init__.py
    │   ├── __pycache__
    │   │   ├── __init__.cpython-312.pyc
    │   │   └── settings.cpython-312.pyc
    │   ├── settings.py
    │   ├── urls.py
    │   └── wsgi.py
    ├── Dockerfile
    ├── manage.py
    ├── myapp
    │   ├── static
    │   │   └── style.css
    │   ├── templates
    │   │   └── home.html
    │   ├── urls.py
    │   └── views.py
    └── requirements.txt

7 directories, 14 files
```

---

## What You’ll Learn

* How to create a basic Django web app
* How to use static files and templates
* How to containerize a Django app with Docker
* How to serve your app at `localhost:8000` using a Docker container

---

## ⚙️ Prerequisites

Make sure you have:

* ✅ Docker installed (test with `docker --version`)
* ✅ Python (3.8+) and `pip` (for initial Django app generation)

---

## 1️⃣ Initial Setup (Local Dev)

### Install Python & Django (optional if already installed)

```bash
sudo apt update
sudo apt install python3 python3-pip -y
pip3 install django
```

### Create Django Project + App

```bash
django-admin startproject myproject .
python3 manage.py startapp myapp
```

---

## 2️⃣ Add a Basic Web Page

### Create a view: `myapp/views.py`

```python
from django.shortcuts import render

def home(request):
    return render(request, 'home.html')
```

### Route it in: `myapp/urls.py`

```python
from django.urls import path
from .views import home

urlpatterns = [
    path('', home),
]
```

### Include it: `myproject/urls.py`

```python
from django.urls import path, include

urlpatterns = [
    path('', include('myapp.urls')),
]
```

---

## 3️⃣ Add Static HTML + CSS

### Template: `myapp/templates/home.html`

```html
{% load static %}
<!DOCTYPE html>
<html>
<head>
  <title>Dockerized Django 🚀</title>
  <link rel="stylesheet" href="{% static 'style.css' %}">
</head>
<body>
  <div class="container">
    <h1>🎉 Welcome to Dockerized Django!</h1>
    <p>This page is powered by Django + Docker.</p>
  </div>
</body>
</html>
```

### Static CSS: `myapp/static/style.css`

```css
body {
  background-color: #121212;
  color: white;
  font-family: sans-serif;
  text-align: center;
  padding-top: 10vh;
}
.container {
  background: #2e2e2e;
  padding: 30px;
  border-radius: 10px;
  width: 60%;
  margin: auto;
}
```

---

## 4️⃣ Configure Django Settings

### In `myproject/settings.py`:

```python
INSTALLED_APPS = [
    ...
    'myapp',
]

STATIC_URL = 'static/'

import os
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'myapp/static')
]
```

---

## 5️⃣ Freeze Dependencies

```bash
pip freeze > requirements.txt
```

---

## 6️⃣ Dockerize It 

### Dockerfile

```Dockerfile
FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
```

---

## 7️Build & Run Docker Image

```bash
docker build -t yourdockerhub/django-app:latest .
docker run -p 8000:8000 yourdockerhub/django-app:latest
```

➡️ Open [http://localhost:8000](http://localhost:8000)

You should see your styled welcome page.

---

## (Optional) Push to Docker Hub

```bash
docker login
docker push yourdockerhub/django-app:latest
```

---

## Common Commands Reference

| Task                 | Command                              |
| -------------------- | ------------------------------------ |
| Freeze deps          | `pip freeze > requirements.txt`      |
| Build Docker image   | `docker build -t name .`             |
| Run Docker container | `docker run -p 8000:8000 name`       |
| Stop container       | `docker ps`, then `docker stop <id>` |
| See logs             | `docker logs <id>`                   |
| Push to Docker Hub   | `docker push <tag>`                  |

---

## Summary

You now have:

* A working Django app
* Styled HTML via templates + CSS 
* Dockerized runtime
* A great starter for bigger apps 

---

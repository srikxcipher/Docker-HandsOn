##  Docker Compose — The Developer’s Orchestrator

> *"One file. Infinite possibilities. Manage multi-container apps like a pro."*
> — Your baby steps into container orchestration start here

---

###  What Is Docker Compose?

Docker Compose is a **tool for defining and running multi-container Docker applications**.

Instead of running multiple `docker run` commands, you define everything in a **single YAML file** called `docker-compose.yml`.

📁 Your application structure:

```
app/
├── docker-compose.yml
├── service1/
│   └── Dockerfile
├── service2/
│   └── Dockerfile
```

---

### Why Use Docker Compose?

|  Benefit             |  Explanation                                     |
| --------------------- | -------------------------------------------------- |
| Single config file    | Manage all services, volumes, networks in one YAML |
| Simple startup        | `docker-compose up` brings everything online       |
| Easier collaboration  | Just share your `docker-compose.yml`               |
| Portable environments | Identical dev → test → prod stacks                 |
| Built-in networking   | Services discover each other via service name      |
| Persistent volumes    | Managed cleanly through config                     |

---

##  Getting Started

### Install Docker Compose (CLI v2+)

It now comes built into Docker Desktop and Docker Engine (v20.10+).
✅ Just ensure this works:

```bash
docker compose version
```

---

## Basic Example: Python Web + Redis Cache

### 🔸 `docker-compose.yml`

```yaml
version: '3.8'

services:
  web:
    build: ./web
    ports:
      - "5000:5000"
    depends_on:
      - redis

  redis:
    image: redis:alpine
```

---

### 🔸 `web/Dockerfile`

```Dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY . .
RUN pip install flask redis
CMD ["python", "app.py"]
```

---

### 🔸 `web/app.py`

```python
from flask import Flask
import redis

app = Flask(__name__)
cache = redis.Redis(host='redis', port=6379)

@app.route('/')
def hello():
    count = cache.incr('hits')
    return f'Hello! You have visited {count} times.'

if __name__ == "__main__":
    app.run(host="0.0.0.0")
```

---

## Run the App

```bash
docker compose up --build
```

Visit: [http://localhost:5000](http://localhost:5000)

---

## Common Docker Compose Commands

```bash
docker compose up           # Start all services
docker compose up -d        # Start in detached mode
docker compose down         # Stop and remove containers, networks, volumes
docker compose ps           # List running services
docker compose logs         # View logs of all services
docker compose build        # Build/rebuild services
docker compose stop/start   # Pause/resume services
```

---

## Tips for Beginners

| 💬 Tip                      | ✅ Explanation                                |
| --------------------------- | -------------------------------------------- |
| Use `depends_on`            | Define service startup order                 |
| Always expose ports         | Expose internal ports via `ports:`           |
| Use volumes wisely          | Keep persistent data in `volumes:`           |
| Service names matter        | They're used as DNS names within the network |
| One container = one concern | Separate services into their own containers  |

---

## Bonus: Volumes, Networks, and Environment Variables

### Using Volumes

```yaml
volumes:
  - db-data:/var/lib/mysql

volumes:
  db-data:
```

### Using Networks

```yaml
networks:
  backend:
  frontend:

services:
  api:
    networks:
      - backend
```

### Using Environment Variables

```yaml
env_file: .env

environment:
  - DEBUG=True
```

---

## Real-World Use Cases

* Python/Node backend + PostgreSQL + Redis
* React frontend + Flask API + MongoDB
* Microservices communication via isolated custom networks
* Dev/prod setups using override files

---

## Final Thoughts

> With Docker Compose, you:
>
> * write once
> * build everything
> * deploy anywhere.

Make your containers work together like a team.


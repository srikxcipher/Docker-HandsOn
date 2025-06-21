# Mood Based Recipe Finder 
An expressive mern-stack web app that recommends recipes based on your current **mood**.

---

## Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Usage Options](#usage-options)
  - [Option 1: Using Pre-Built Docker Images (from Docker Hub)](#option-1-using-pre-built-docker-images-from-docker-hub)
  - [Option 2: Using Locally Built Dockerfiles](#option-2-using-locally-built-dockerfiles)
- [Environment Variables](#environment-variables)
- [Endpoints](#endpoints)
- [Development Workflow](#development-workflow)
- [Notes](#notes)
- [DockerHub](#pushing-to-docker-hub)

---

## Overview

Mood Recipe Finder is a MERN-based project:
- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Database:** MongoDB
- **Dockerized:** Both `client` and `server` are containerized and connected through Docker Compose.

---

## Snaps

<p align="center">
  <img src="https://github.com/srikxcipher/Docker-HandsOn/blob/d94744b6144d824e91004eecb9d4f38af5f5fb62/assets/mood-recipe-home.png" alt="Home Page" width="45%" />
  <img src="https://github.com/srikxcipher/Docker-HandsOn/blob/d94744b6144d824e91004eecb9d4f38af5f5fb62/assets/mood-recipe-res.png" alt="Results Page" width="45%" />
</p>



## Project Structure

```bash
.
├── client/                  
├── server/                 
├── Dockerfile.client        # Dockerfile for building frontend
├── Dockerfile.server        # Dockerfile for building backend
├── docker-compose.yml       # Main Compose file
├── README.md
```

---

## Usage Options

### Option 1: Using Pre-Built Docker Images (from Docker Hub)

If you just want to run the app quickly without building the images locally:

1. Edit `docker-compose.yml` like this:

   ```yaml
   services:
     client:
       image: your-dockerhub-username/mood-recipe:client #for eg. srikant25/mood-based-recipe:client
       volumes:
         - client_build:/app/dist
       networks:
         - app-network

     server:
       image: your-dockerhub-username/mood-recipe:server #for eg. srikant25/mood-based-recipe:server
       ports:
         - "5000:5000"
       environment:
         - NODE_ENV=production
         - MONGODB_URI=mongodb://mongo:27017/mood-recipes
       volumes:
         - client_build:/app/public
       depends_on:
         - client
         - mongo
       networks:
         - app-network
   ```

2. Then run:

   ```bash
   docker compose pull         # Pull the latest images
   docker compose up -d        # Start the containers
   ```

3. Visit: [http://localhost:5000](http://localhost:5000) on your vm / local machine where the docker is up and running.

---

### Option 2: Using Locally Built Dockerfiles

If you're making changes or learning how the app works under the hood:

1. Make sure your folder structure looks like this:

   ```
   .
   ├── client/
   ├── server/
   ├── Dockerfile.client
   ├── Dockerfile.server
   └── docker-compose.yml
   ```

2. Your `docker-compose.yml` should reference the Dockerfiles:

   ```yaml
   services:
     client:
       build:
         context: ./client
         dockerfile: ../Dockerfile.client
       volumes:
         - client_build:/app/dist
       networks:
         - app-network
       command: echo "Client built and shared via volume"

     server:
       build:
         context: ./server
         dockerfile: ../Dockerfile.server
       ports:
         - "5000:5000"
       environment:
         - NODE_ENV=production
         - MONGODB_URI=mongodb://mongo:27017/mood-recipes
       depends_on:
         - client
         - mongo
       volumes:
         - client_build:/app/public
       networks:
         - app-network
   ```

3. Then build and run:

   ```bash
   docker compose build
   docker compose up -d
   ```

4. The app will be accessible at:

   ```
   http://localhost:5000
   ```

---

## Environment Variables

These are defined in `docker-compose.yml`, but can also be passed from a `.env` file:

```env
NODE_ENV=production
MONGODB_URI=mongodb://mongo:27017/mood-recipes
PORT=5000
```

---

## API Endpoints

* `GET /api/health` → Check server health
* `GET /api/recipes` → Get all recipes
* `GET /api/recipes/:mood` → Get recipes by mood
* `POST /api/recipes` → Add a new recipe
* `POST /api/recipes/search` → Search recipes by ingredients and mood
* `POST /api/seed` → Seed the database with sample recipes

---

## Development Workflow

If you want to run just the frontend or backend separately:

### Frontend:

```bash
cd client
npm install
npm run dev
```

### Backend:

```bash
cd server
npm install
node index.js
```

> Make sure MongoDB is running locally or via Docker when running the server directly.

---

## Notes

* Uses a **shared volume** (`client_build`) so the frontend is built once and served by the backend.
* Uses a custom **Docker network** (`app-network`) to allow clean inter-container communication.
* MongoDB data is persisted using a **named Docker volume** (`mongo_data`).

---

## Pushing to Docker Hub

If you're maintaining your own Docker images:

```bash
docker tag mood-recipe-client your-dockerhub-username/mood-recipe:client
docker tag mood-recipe-server your-dockerhub-username/mood-recipe:server

docker push your-dockerhub-username/mood-recipe:client
docker push your-dockerhub-username/mood-recipe:server
```

---

Enjoy building and customizing your **mood-based recipe app!**
Feel free to fork, contribute, or explore more features.

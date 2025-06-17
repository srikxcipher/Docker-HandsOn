
> “Docker may look intimidating at first — but once you run your first container, there's no going back”

---

## Install Docker on Ubuntu EC2 or local VM Instance

```bash
sudo apt update
sudo apt install docker.io -y
```

✔️ Installs Docker Engine from the Ubuntu package repo.

---

### Check Docker Version

```bash
docker version
```

✔️ Confirms Docker was installed and shows client/server versions.

---

### Check Docker Service Status

```bash
sudo systemctl status docker.service
```

✔️ Use this to confirm Docker is up and running in the background (aka the Docker Daemon `dockerd`).

---

## Run Your First Container

```bash
docker run hello-world
```

🎉 This downloads and runs a test image to check if Docker works.

---

### 🛑 Facing Permission Error?

```text
docker: permission denied while trying to connect to the Docker daemon socket
```

🚧 That means your user isn’t added to the Docker group yet.

#### 👉 Fix it with:

```bash
sudo usermod -aG docker $USER
```

> Now **logout and login back** to apply the change — then try again:

```bash
docker run hello-world
```

✅ This time it should work like a charm.

---

##  Build Your First Docker Image

```bash
docker build -t yourdockerhub/my-first-docker-image:latest .
```

✔️ Creates an image using the Dockerfile in the current directory (`.`).

* `-t`: Tags your image with a name you can remember.
* `latest`: Default version tag.

💡 Without `-t`, Docker will still build your image, but you’ll have to track it using a random **Image ID** (ugly and forgettable 😬).

---

## List All Docker Images

```bash
docker images
```

✔️ Shows local images with their name, tag, image ID, and size.

---

## Run Your Image (Interactive)

```bash
docker run -it yourdockerhub/my-first-docker-image:latest
```

✔️ Runs your image in an interactive terminal.

* `-it`: Allows interaction inside the container (keyboard input).

---

## Share Your Image with the World (Docker Hub)

Docker Hub is like GitHub, but for container images. Let’s upload your image so others can pull it down.

---

### Login to Docker Hub

```bash
docker login
```

> ✨ Use your Docker credentials (create at [https://hub.docker.com](https://hub.docker.com) if you haven’t already)

---

### 📡 Push Image to Docker Hub

```bash
docker push yourdockerhub/my-first-docker-image:latest
```

 Uploads your local image to your Docker Hub account.

* `yourdockerhub`: Your Docker Hub username.
* `latest`: You can use custom tags too (like `v1`, `prod`, `beta`).

---

### Bonus: Pulling Images from Docker Hub

```bash
docker pull nginx
```

Downloads the official **Nginx** image from Docker Hub. Great for exploring pre-built images.

---

## Useful Clean-Up Commands

```bash
docker ps           # List running containers
docker ps -a        # List all containers
docker stop <id>    # Stop a container
docker rm <id>      # Remove a container
docker rmi <id>     # Remove an image
```

>  Keep your system clean — containers and images take space fast.

---

## Conclusion

You’ve now installed Docker, built your own image, ran it, and even pushed it to the cloud — **you’re officially containerized!**

>  “Master Docker one image at a time — the cloud awaits your containers.”


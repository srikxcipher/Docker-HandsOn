
[![DockerHub Pulls](https://img.shields.io/docker/pulls/srikant25/docker-demo?label=Pulls&logo=docker)](https://hub.docker.com/r/srikant25/docker-demo)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen?logo=github-actions)](https://github.com/srikxcipher/Docker-HandsOn/actions)

Your hands-on terminal app to get started with Docker in seconds.

---

## Quick Start (No Setup Needed)

You can run this demo directly from Docker Hub – no need to clone or build anything!

### 🔽 Step 1: Pull the Image

```bash
docker pull srikant25/docker-demo:latest
```

### ▶️ Step 2: Run the App

```bash
docker run srikant25/docker-demo:latest
```

### Optional: Customize the Greeting

```bash
docker run -e NAME="Docker Champion" srikant25/docker-demo:latest
```

---

## Demo Preview

> 💡 Here's what you'll see when you run the container:

![Docker Terminal Demo](https://github.com/srikxcipher/Docker-HandsOn/blob/c6f348b9e7252d5c84f78b44d12c06ac8ad4aa22/assets/demo-app-terminal-output.png)

---

## What's Inside?

| File         | Purpose                                 |
|--------------|------------------------------------------|
| `app.py`    | Python app with ASCII + color terminal UI |
| `Dockerfile` | Image definition for Docker             |
| `README.md`  | This guide                              |

> Uses `rich` and `pyfiglet` for colorful output and banners inside Docker.

---

## Want to Contribute?

Pull requests are welcome! Try adding:
- More environment variable customization
- Terminal animations
- A learning challenge mode!

---

## 🤝 Credits

Made with 💙 by [@srikant](https://github.com/srikxcipher)

---

## Stay Curious. Keep Shipping. ⚓

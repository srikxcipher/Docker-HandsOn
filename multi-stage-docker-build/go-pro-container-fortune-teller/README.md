# Go Container Fortune Teller

 _"Your whimsical, lightweight app that reveals a random containerization fortune on every request."_  
 Built with **Go**, containerized using 💙 **multi-stage Docker builds**, and optionally optimized with **Distroless Images** for minimal attack surface & size.

---

## Try It Instantly

```bash
docker pull srikant25/container-fortune:distroless-ui-v1
docker run -p 8080:8080 srikant25/container-fortune:distroless-ui-v1
```

> Open your browser: [http://localhost:8080](http://localhost:8080)

---

## How It Looks

| UI                                |
| ------------------------------------------------------ |
| ![Container Fortune Screenshot](https://github.com/srikxcipher/Docker-HandsOn/blob/09d67b75e7c0e3b9c2355bcec69386e8f171b490/assets/go-pro-container-fortune.png) |

> A glowing interface with animated messages, custom fonts, soft shadows — perfect for demos, portfolios, or just a smile 😊

---

## Project Overview

This project demonstrates:

* ✅ A **Go Web Server** serving dynamic fortunes via HTTP
* ✅ A **multi-stage Docker build** for clean & reproducible images
* ✅ A **Distroless production image** — secure & tiny
* ✅ An engaging **HTML/CSS frontend** for browser-based experience

---

## Tech Highlights

| Component     | Stack                          |
| ------------- | ------------------------------ |
| Language      | Go (Golang)                    |
| Web Framework | `net/http` + HTML Template     |
| Styling       | Vanilla CSS with Google Fonts  |
| Docker        | Multi-stage build + Distroless |
| Usage Mode    | Terminal & Browser friendly    |

---

## Learn More

Want to understand how this works under the hood?

👉 [**View Detailed Walkthrough & Project Files →**](https://github.com/srikxcipher/Docker-HandsOn/blob/fd79365e7d749cd49984f0f469d7c3367553a3e0/multi-stage-docker-build/go-pro-container-fortune-teller/info.md)

Includes:

* Project structure explained
* Dockerfile & Go code breakdown
* Why distroless? Why multi-stage?
* Bonus: How to build your own Go app like this

---

## Image Info

| Docker Hub    | [srikant25/container-fortune](https://hub.docker.com/r/srikant25/container-fortune) |
| ------------- | ----------------------------------------------------------------------------------- |
| Image tag     | `distroless-ui-v1`                                                                  |
| Size          | \5.84 MB (after multi-stage + distroless)                                             |
| Ports Exposed | `8080`                                                                              |
| Built with    | `Dockerfile` in root using Go 1.21                                                  |

---

## ❤️ Contribute / Fork

This project is part of the [**Docker Hands-On Series**](https://github.com/srikxcipher/Docker-HandsOn).

Want to:

* Try your own version?
* Modify the UI?
* Add CLI-only support?

Star this repo ⭐ to support my work and Feel free to fork....

---

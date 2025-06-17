# Getting Started with Docker & Containerization


---

## What is Containerization?

Containerization is a lightweight alternative to full machine virtualization that involves encapsulating an application and its dependencies into a single, runnable unit called a **container**.

---

### 🆚 Container vs Virtual Machine (VM)

| Feature              | Virtual Machine (VM)           | Container (Docker)               |
|----------------------|--------------------------------|----------------------------------|
| OS Boot              | Boots full OS per VM           | Shares host OS kernel           |
| Resource Usage       | Heavy (GBs of RAM/Storage)     | Lightweight (MBs)               |
| Start-up Time        | Slow (minutes)                 | Fast (seconds)                  |
| Isolation            | Strong (hardware-level)        | Process-level isolation         |
| Portability          | Less portable                  | Highly portable across systems  |
| Image Size           | Large (~GBs)                   | Small (~MBs)                    |

> **Containers are faster, lighter, and more portable than VMs.**

---

## Introduction to Docker

Docker is the most popular containerization platform that allows developers to package applications into containers — standardized, executable components combining source code with OS libraries and dependencies.

---

### Why Docker?

- ✅ Lightweight and fast
- ✅ Works on any machine that runs Docker
- ✅ Simplifies CI/CD and testing
- ✅ Enables microservices architecture
- ✅ Reduces "it works on my machine" issues

> Used by Netflix, PayPal, Spotify, and countless others in production environments.

---

## Docker Architecture

![Docker Architecture](https://www.techsupper.com/wp-content/uploads/2021/08/DockerArch-2-1024x458.png)

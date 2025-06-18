# Multi-Stage Docker Builds & Distroless Images

> *“Your Dockerfiles are about to hit the gym — let’s strip the fat, build smarter, and ship lighter!”*

---

## Why This Matters?

In traditional Docker builds, your image often ends up bloated with:

* Compilers
* Debug tools
* Unused dependencies

Result?
⚠️ Slower builds
⚠️ Bigger image sizes
⚠️ Security risks

Let’s change that.

---

##  Enter: Multi-Stage Builds

###  What Is It?

> **Multi-stage builds** let you use one Docker stage to build your app, and another minimal stage to run it — all in one file.

Think of it as:

* **Chef's Kitchen (build)** → mess everywhere 
* **Plated Dish (final image)** → only what’s served 

---

##  Key Features & Advantages

| Feature               | Benefit                          |
| --------------------- | -------------------------------- |
|  Smaller image size | Only runtime files, no dev tools |
|  Secure images      | Less surface for attacks         |
|  Faster CI/CD       | Pull/push smaller layers         |
|  Clean separation   | Dev vs Prod environments         |

---

## Real-Life Use Case

* **Go App**: Compile-heavy build → tiny binary
* **Companies**: Stripe, Uber, Netflix use this to:

  * Speed up deploys
  * Harden container security
  * Optimize infra costs (yes, GBs cost 💰)

---

# Hands-On: Go App with Multi-Stage Docker Build

## 1. Build without Multi-Stage (Bloated Image)

### **main.go**

```go
package main
import "fmt"

func main() {
    fmt.Println("Hello from Dockerized Go App 🚀")
}
```

### **Dockerfile (fat version)**

```Dockerfile
FROM golang:1.21

WORKDIR /app
COPY . .

RUN go build -o main

CMD ["./main"]
```

### Build & Run

```bash
docker build -t go-fat .
docker run go-fat
```

### Check size:

```bash
docker images go-fat
```

**\~1 GB+** 😨

---

## 2. Build with Multi-Stage

### **Dockerfile (multi-stage)**

```Dockerfile
# Stage 1: Build
FROM golang:1.21 AS builder
WORKDIR /app
COPY . .
RUN go build -o app

# Stage 2: Final clean image
FROM debian:bullseye-slim
WORKDIR /root/
COPY --from=builder /app/app .

CMD ["./app"]
```

### Build & Run

```bash
docker build -t go-slim .
docker run go-slim
```

### Size now?

```bash
docker images go-slim
```

 **\~20–30 MB** 😍

---

## Bonus: Distroless Images

> **Distroless images** have **no package manager, shell, or OS libraries** — just your app and minimal runtime.
> Secure, smaller, cleaner.

### Replace `debian:bullseye-slim` with:

```Dockerfile
FROM gcr.io/distroless/static
COPY --from=builder /app/app /
CMD ["/app"]
```

✅ No shell
✅ No bash
✅ Final image: **10–15 MB**
✅ Almost zero CVEs (great for prod & audit compliance)

---

## Final Comparison

| Build Type       | Image Size | Security | Layer Control |
| ---------------- | ---------- | -------- | ------------- |
| Traditional      | \~1 GB     | ❌        | ❌             |
| Multi-Stage Slim | \~30 MB    | ✅        | ✅             |
| Distroless       | \~10–15 MB | ✅✅✅      | 🔐 High       |

---

## Real-World Use Cases

| Industry    | Use Case                               |
| ----------- | -------------------------------------- |
| Fintech     | Minimal CVEs → faster compliance       |
| Startups    | Lower storage + faster deploys         |
| Enterprises | Air-gapped environments, hardened base |

---

## Summary

* Use multi-stage to trim down build + run layers
* Use distroless for ultimate minimal, secure images
* Ideal for Go, Java, Node, Python, and CI pipelines


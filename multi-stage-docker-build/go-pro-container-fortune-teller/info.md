### Folder Structure

```
go-container-fortune/
├── main.go
├── Dockerfile
├── Dockerfile.distroless
├── .dockerignore
└── README.md
```

---

### main.go

```go
package main

import (
    "fmt"
    "math/rand"
    "net/http"
    "time"
)

var fortunes = []string{
    "Your container image will lose 80% of its weight.",
    "Kubernetes will bless your next deployment.",
    "Your next build will cache perfectly.",
    "Your CI/CD pipeline has no errors today.",
    "A multi-stage build will improve your Docker karma.",
    "Distroless images bring peace and security.",
}

func getFortune() string {
    rand.Seed(time.Now().UnixNano())
    return fortunes[rand.Intn(len(fortunes))]
}

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "🔮 Container Fortune: %s", getFortune())
}

func main() {
    http.HandleFunc("/", handler)
    fmt.Println("🔮 Serving fortunes on http://localhost:8080")
    http.ListenAndServe(":8080", nil)
}
```

---

### Dockerfile (Multi-stage)

```dockerfile
# Stage 1: Build
FROM golang:1.21 AS builder
WORKDIR /app
COPY . .
RUN go build -o fortune

# Stage 2: Final runtime image
FROM debian:bullseye-slim
WORKDIR /root/
COPY --from=builder /app/fortune .
EXPOSE 8080
CMD ["./fortune"]
```

---

### Dockerfile.distroless (Optional)

```dockerfile
# Stage 1: Build
FROM golang:1.21 AS builder
WORKDIR /app
COPY . .
RUN go build -o fortune

# Stage 2: Distroless runtime
FROM gcr.io/distroless/static
COPY --from=builder /app/fortune /
EXPOSE 8080
CMD ["/fortune"]
```

---

### .dockerignore

```dockerignore
*.md
*.DS_Store
```

---

## What It Does

Visit [http://localhost:8080](http://localhost:8080) and receive delightful messages like:

> _“Your container image will lose 80% of its weight.”_

> _“Distroless images bring peace and security.”_

Fun, tiny, and perfect for demonstrating real-world Docker best practices.

---

## Run Locally

### 1️⃣ Multi-Stage Build

```bash
docker build -t container-fortune .
docker run -p 8080:8080 container-fortune
````

### 2️⃣ Distroless Version (More secure, smaller)

```bash
docker build -f Dockerfile.distroless -t container-fortune-min .
docker run -p 8080:8080 container-fortune-min
```

---

## Inside the App

* Built with Go (Golang)
* Exposes a random fortune over HTTP
* Built using **multi-stage Docker builds** to keep image size small (\~20–30MB)
* Optionally uses **distroless images** for max security (\~10–15MB)

---

## Comparison

| Build Type  | Base Image            | Size      | Notes                         |
| ----------- | --------------------- | --------- | ----------------------------- |
| Traditional | golang:1.21           | \~1GB     | Dev tools included            |
| Multi-Stage | debian\:bullseye-slim | \~30MB    | Smaller, clean runtime        |
| Distroless  | gcr.io/distroless     | \~10–15MB | Minimized & secure runtime    |

---

## Try It Live (Optional)

You can pull the Docker image:

```bash
docker pull srikant25/container-fortune:latest
docker run -p 8080:8080 srikant25/container-fortune:latest
```

---

## Learnings Covered

* Multi-Stage Docker Build
* Distroless Runtime Images
* Minimal Go Web Server
* Clean Docker Image Optimization

---

## File Structure

```
go-container-fortune/
├── main.go                  # Go HTTP server
├── Dockerfile               # Multi-stage build
├── Dockerfile.distroless    # Distroless image
├── .dockerignore
└── README.md
```

---

Made with ❤️ by [@srikxcipher](https://github.com/srikxcipher)



---
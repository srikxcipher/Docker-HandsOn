## Build with Multi-Stage

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


> **Distroless images** have **no package manager, shell, or OS libraries** — just your app and minimal runtime.
> Secure, smaller, cleaner.

### Replace `debian:bullseye-slim` with:

```Dockerfile
FROM gcr.io/distroless/static
COPY --from=builder /app/app /
CMD ["/app"]
```

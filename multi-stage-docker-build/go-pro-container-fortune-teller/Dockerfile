# -------- Stage 1: Builder --------
FROM golang:1.21 AS builder

WORKDIR /app

# Copy Go source files
COPY main.go .

# Initialize Go module inside the container
RUN go mod init go-container-fortune \
    && go mod tidy

# Build the binary
RUN go build -o fortune

# -------- Stage 2: Slim Runtime --------
FROM debian:bullseye-slim

WORKDIR /root/
COPY --from=builder /app/fortune .

EXPOSE 8080

CMD ["./fortune"]

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

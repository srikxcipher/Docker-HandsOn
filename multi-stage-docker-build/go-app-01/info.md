
## Build without Multi-Stage (Bloated Image)

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



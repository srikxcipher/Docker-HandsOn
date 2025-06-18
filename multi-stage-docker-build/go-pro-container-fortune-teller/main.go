package main

import (
    "fmt"
    "math/rand"
    "net/http"
    "time"
)

var fortunes = []string{
    "Containers will bless your next deployment!",
    "A multi-stage Dockerfile a day keeps bugs away!",
    "Kubernetes says: you're doing great!",
    "Distroless images are your security blanket.",
}

func getFortune() string {
    rand.Seed(time.Now().UnixNano())
    return fortunes[rand.Intn(len(fortunes))]
}

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "🔮 Container Fortune: %s\n", getFortune())
}

func main() {
    http.HandleFunc("/", handler)
    fmt.Println("🔮 Serving on :8080")
    if err := http.ListenAndServe(":8080", nil); err != nil {
        panic(err)
    }
}

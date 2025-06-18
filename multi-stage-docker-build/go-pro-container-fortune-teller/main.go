/*
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
*/

/*
    Updated main.go (HTML + Styling + Info + Links).
*/

package main

import (
	"html/template"
	"math/rand"
	"net/http"
	"time"
)

var fortunes = []string{
	"Containers will bless your next deployment!",
	"A multi-stage Dockerfile a day keeps bugs away!",
	"Kubernetes says: you're doing great!",
	"Distroless images are your security blanket.",
	"May your builds always cache!",
}

var tmpl = template.Must(template.New("fortune").Parse(`
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>🚀 Container Fortune</title>
	<style>
		@import url('https://fonts.googleapis.com/css2?family=Fira+Sans&display=swap');
		body {
			margin: 0;
			padding: 0;
			font-family: 'Fira Sans', sans-serif;
			background: linear-gradient(135deg, #1d2b64, #f8cdda);
			height: 100vh;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			color: #fff;
			overflow: hidden;
		}
		.container {
			background: rgba(0, 0, 0, 0.6);
			padding: 40px 60px;
			border-radius: 16px;
			box-shadow: 0 0 25px rgba(255, 255, 255, 0.2);
			text-align: center;
			max-width: 700px;
			animation: fadeIn 1.2s ease-in-out;
		}
		h1 {
			font-size: 2.8rem;
			margin-bottom: 20px;
			color: #00ffe7;
		}
		p.fortune {
			font-size: 1.5rem;
			margin: 30px 0;
			color: #fffbe0;
		}
		footer {
			margin-top: 40px;
			font-size: 0.9rem;
			color: #ccc;
		}
		a {
			color: #00ffe7;
			text-decoration: none;
			font-weight: bold;
		}
		a:hover {
			text-decoration: underline;
		}
		@keyframes fadeIn {
			from { opacity: 0; transform: translateY(-20px); }
			to { opacity: 1; transform: translateY(0); }
		}
	</style>
</head>
<body>
	<div class="container">
		<h1>🔮 Container Fortune</h1>
		<p class="fortune">{{.}}</p>
		<p>🚢 Powered by <strong>Docker Multi-Stage</strong> + <strong>Distroless</strong> 🧊</p>
		<footer>
			Source: <a href="https://github.com/srikxcipher/Docker-HandsOn/tree/main/multi-stage-docker-build/go-pro-container-fortune-teller" target="_blank">GitHub</a> |
			Image: <a href="https://hub.docker.com/r/srikant25/container-fortune" target="_blank">Docker Hub</a>
		</footer>
	</div>
</body>
</html>
`))

func handler(w http.ResponseWriter, r *http.Request) {
	rand.Seed(time.Now().UnixNano())
	tmpl.Execute(w, fortunes[rand.Intn(len(fortunes))])
}

func main() {
	http.HandleFunc("/", handler)
	http.ListenAndServe(":8080", nil)
}


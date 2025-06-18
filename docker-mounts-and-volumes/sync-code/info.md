### Run with Bind Mount

```bash
docker build -t sync-app .
docker run -v $(pwd):/app sync-app
```

### OR 

- Simple use pre-built image:

```bash
docker pull srikant25/sync-code:latest
```
- Run

```bash
docker run -v $(pwd):/app sync-app
```

> ✅ Any edits to app.py will reflect instantly on re-run. Great for dev workflows!
- i.e This is perfect for development environments where you want:
- To write code on your host machine, and see the results immediately reflected in the running container — no rebuilds needed.
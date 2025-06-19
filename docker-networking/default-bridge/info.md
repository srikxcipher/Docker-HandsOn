### Default Bridge Demo – `docker0`

**Goal:** Show that containers can’t resolve each other by name unless they're in a custom network.

#### 🧾 Steps:

1. **Dockerfile** (basic Alpine ping tool):

```Dockerfile
FROM alpine
RUN apk add --no-cache iputils
CMD ["sh"]
```

2. **Build image:**

```bash
docker build -t ping-alpine .
```

3. **Run 2 containers in default bridge network:**

```bash
docker run -dit --name containerA ping-alpine
docker run -dit --name containerB ping-alpine
```

4. **Test:**

```bash
docker exec -it containerA ping containerB  # ❌ Won’t resolve containerB
```

---

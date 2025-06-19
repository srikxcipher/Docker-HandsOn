### 03. Multi-Network Container – API Gateway Style

**Goal:** One container connected to both frontend and backend networks.

#### 🧾 Steps:

1. **Create networks:**

```bash
docker network create frontend
docker network create backend
```

2. **Run app on frontend:**

```bash
docker run -dit --name app --network frontend ping-alpine
```

3. **Connect app to backend as well:**

```bash
docker network connect backend app
```

4. **Now `app` is on both networks — can reach both sets of services.**

---


### Custom Bridge Network – Isolation + DNS

**Goal:** Let containers ping each other by name (DNS works in custom bridge).

#### 🧾 Steps:

1. **Create custom network:**

```bash
docker network create custom-net
```

2. **Run containers:**

```bash
docker run -dit --name web --network custom-net ping-alpine
docker run -dit --name db --network custom-net ping-alpine
```

3. **Test:**

```bash
docker exec -it web ping db  # ✅ Works by container name
```

---


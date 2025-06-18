## Persistent MySQL Using Volumes (Simplified with Dockerfile)

> **Tagline:** *"Run → Stop → Remove → Re-run → Still have your database. That’s Docker volumes in action!"*

---

### Folder Structure

```
mysql-volume-persistence/
├── Dockerfile
└── init.sql
```

---

### `init.sql` (initial schema/data – auto-loaded on container start)

```sql
CREATE DATABASE IF NOT EXISTS hands_on;

USE hands_on;

CREATE TABLE IF NOT EXISTS welcome_note (
  id INT AUTO_INCREMENT PRIMARY KEY,
  note VARCHAR(255)
);

INSERT INTO welcome_note(note) VALUES ("🎉 You are inside a persistent MySQL container!");
```

---

### 📄 `Dockerfile`

```Dockerfile
FROM mysql:8

# Environment variables for root and database
ENV MYSQL_ROOT_PASSWORD=pass123
ENV MYSQL_DATABASE=hands_on

# Copy init script to container’s init directory
COPY init.sql /docker-entrypoint-initdb.d/
```

---

### Build the Image

```bash
docker build -t mysql-handson .
```


### OR 

- Use pre-built image:

```bash
docker pull srikant25/mysql-handson:latest
```

---

### Run With Docker Volume

```bash
docker volume create mysql-data-vol

docker run -d \
  --name mysql-vol \
  -v mysql-data-vol:/var/lib/mysql \
  -p 3306:3306 \
  mysql-handson
```

> *Port 3306 exposed so learners can connect via MySQL clients too (like DBeaver, TablePlus etc).*

---

### Test It

After it’s running:

```bash
docker exec -it mysql-vol mysql -uroot -ppass123 -e "SELECT * FROM hands_on.welcome_note;"
```

You'll see:

```
+----+--------------------------------------------------------+
| id | note                                                   |
+----+--------------------------------------------------------+
|  1 | 🎉 You are inside a persistent MySQL container!        |
+----+--------------------------------------------------------+
```

---

### Now Show Persistence

```bash
docker stop mysql-vol
docker rm mysql-vol

# Re-run same container with same volume
docker run -d \
  --name mysql-vol \
  -v mysql-data-vol:/var/lib/mysql \
  -p 3306:3306 \
  mysql-handson
```

- Run the same `SELECT` again — data remains. ✅


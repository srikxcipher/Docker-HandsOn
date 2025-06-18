# Dive Into Bind Mounts vs Volumes

_"Your containers are ephemeral, but your data shouldn't be."_  
Let’s explore how Docker handles **persistent storage** through **Bind Mounts** and **Volumes**.

---

## 🔍 What Are Bind Mounts and Volumes?

| Feature           | Bind Mounts                              | Docker Volumes                              |
|------------------|------------------------------------------|---------------------------------------------|
| **Definition**    | Direct link between host dir & container | Managed storage area handled by Docker      |
| **Created By**    | You (manual path)                        | Docker (using `docker volume` CLI)          |
| **Use Case**      | Dev environments, live code editing      | Production, DB persistence, backups         |
| **Security**      | Less secure (full host access)           | More secure (Docker-managed)                |
| **Backup & Restore** | Manual                                | Easy (volume export/import supported)       |
| **Performance**   | Slightly slower                          | Optimized for Docker's use                  |

> **Winner:** Docker **Volumes** – more secure, flexible, and production-ready.

---

## Why Are They Important?

Containers are **stateless** by nature — when you remove a container, its filesystem is gone.

So how do we:
- Keep user data?
- Persist DB files?
- Share config or logs?

👉 **Volumes and Bind Mounts!**

They allow containers to:
- Access and write data **persistently**
- Share files with the **host system**
- Sync changes during **development**
- **Move data** between environments easily

---

## 💬 Real Use Cases

-  MySQL storing `/var/lib/mysql` in a volume  
-  Mounting source code into `/app` during development  
-  Running test reports into a shared folder  
-  Logging services writing to a monitored host dir

---

##  Common Docker Volume & Mount Commands

### Create a named volume
docker volume create mydata

### List all volumes
docker volume ls

### Inspect a specific volume
docker volume inspect <volume-name>

### Remove one or more volumes
docker volume rm <volume-name1> <volume-name2>

### Use a named volume in a container
docker run -v mydata:/data my-image

### Use a bind mount (local directory to container)
docker run -v $(pwd)/logs:/app/logs my-image

### Use --mount syntax for a named volume
docker run -d --mount source=mydata,target=/app nginx:latest

### Remove a volume (must first stop/remove any containers using it)
docker rm <container-name>
docker volume rm <volume-name>

### Clean up all unused volumes
docker volume prune



> Named volumes are **managed**, easier to migrate, and avoid accidental overrides.

---

## Choosing Storage in Docker

```text
             ┌──────────────────────┐
             │ Need persistent data?│
             └─────────┬────────────┘
                       ↓
                ┌───────────────┐
                │ Host sync/dev?│
                └──────┬────────┘
                       ↓
           Yes ──▶ Bind Mounts
                       │
             No ──▶ Volumes
```

---

## Points to Remember

*  Never store important data **inside** the container filesystem!
*  Use **bind mounts** for dev, **volumes** for production.
*  Volumes live at `/var/lib/docker/volumes/`
*  Volumes offer **better isolation and security**
*  You can even **share volumes across containers**

---

##  Coming Up Next in This Series

> cooking up demos like:

*  A file-logger app using bind mount
*  MySQL + volume-based DB persistence
*  Sharing volume between two containers
*  Syncing code between host and container live

Docker-HandsOn/
└── docker-volumes-and-mounts/
    ├── file-logger-app/
    ├── mysql-volume-persistence/
    ├── shared-volumes/
    └── sync-code/


---

## 📌 Try a Quick Demo Now

```bash
# Create a volume
docker volume create demo-vol

# Run container with volume
docker run -it -v demo-vol:/data ubuntu bash

# Inside container:
echo "Persisted data" > /data/info.txt

# Exit and restart another container with same volume
docker run -it -v demo-vol:/data ubuntu bash
cat /data/info.txt  # ✅ Data is still there!
```

---

## Support & Star

 *"Found this helpful? Just drop a ⭐ on the repo — it truly motivates me!"*
 [Docker-HandsOn](https://github.com/srikxcipher/Docker-HandsOn)

---

###  Reach Me

Want to collaborate, give feedback, or have a question?

 DM me on GitHub or LinkedIn
 Follow for more hands-on DevOps stuff coming soon

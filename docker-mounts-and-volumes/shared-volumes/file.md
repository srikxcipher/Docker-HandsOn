### Shared Volume Between Two Containers

> Goal: One container writes, another reads.

- Setup
```bash
docker volume create shared-data
```
### Writer Container
```bash
docker run -dit --name writer -v shared-data:/data ubuntu
docker exec -it writer bash -c "echo 'Shared data content' > /data/file.txt"
```
### Reader Container
```bash
docker run -it --name reader -v shared-data:/data ubuntu cat /data/file.txt
```
✅ Output should show: Shared data content 
### Run It

```bash
docker build -t file-logger-app .
docker run -v $(pwd)/logs:/logs file-logger-app
```

- Log file will appear in ./logs/log.txt


### Output
```text
srikant@srikx-ubuntu:~/Docker-HandsOn/docker-bind-mounts-and-volumes/file-logger-app$ cd logs
srikant@srikx-ubuntu:~/Docker-HandsOn/docker-bind-mounts-and-volumes/file-logger-app/logs$ ls
log.txt
srikant@srikx-ubuntu:~/Docker-HandsOn/docker-bind-mounts-and-volumes/file-logger-app/logs$ cat log.txt
Log at Wed Jun 18 15:55:33 2025
Log at Wed Jun 18 15:55:35 2025
Log at Wed Jun 18 15:55:37 2025
Log at Wed Jun 18 15:55:39 2025
Log at Wed Jun 18 15:55:41 2025
Log at Wed Jun 18 15:55:43 2025
Log at Wed Jun 18 15:55:45 2025
Log at Wed Jun 18 15:55:47 2025
Log at Wed Jun 18 15:55:49 2025
Log at Wed Jun 18 15:55:51 2025
Log at Wed Jun 18 15:55:53 2025
Log at Wed Jun 18 15:55:55 2025
Log at Wed Jun 18 15:55:57 2025
```
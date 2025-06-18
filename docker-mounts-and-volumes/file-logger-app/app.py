import time

while True:
    with open("/logs/log.txt", "a") as f:
        f.write(f"Log at {time.ctime()}\n")
    time.sleep(2)

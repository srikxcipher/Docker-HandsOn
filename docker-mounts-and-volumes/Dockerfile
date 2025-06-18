# Use a basic image
FROM ubuntu:latest

# Install utilities
RUN apt update && apt install -y \
    curl \
    nano

# Create a working directory inside the container
WORKDIR /data

# Set default command
CMD ["bash"]

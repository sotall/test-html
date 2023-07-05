#!/bin/bash

# Remove any previous Docker images with the same name
docker image rm web-app

# Build the Docker image
docker build -t web-app .

# Run the Docker image
docker run -it --rm --name web-app -p 8088:80 web-app

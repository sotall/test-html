#!/bin/bash

# # Remove any previous Docker images with the same name
# docker image rm web-app

# # Build the Docker image
# docker build -t web-app .

# # Run the Docker image
# docker run -it --rm --name web-app -p 8088:3000 web-app
# # docker run -it --rm --name web-app -p 8088:3000 --entrypoint /bin/bash web-app
# # docker run -it --rm --name web-app -p 8088:80 --entrypoint /bin/sh web-app

# # node login-app/server.js

docker image rm login-app
docker-compose -f login-app/docker-compose.yml build

docker-compose -f login-app/docker-compose.yml up
# docker-compose -f login-app/docker-compose.yml down





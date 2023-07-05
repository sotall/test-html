# Use the nginx:alpine image for serving static files
FROM nginx:alpine

# Set working directory
WORKDIR /app

# Copy the server.js file and users.json
COPY login-app/server.js login-app/users.json ./

# Copy the static files into the nginx directory
COPY login-app/html/ /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run the server.js file using Node.js
# CMD ["node", "server.js"]

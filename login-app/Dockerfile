# Use official node image as the base image
FROM node:14

# Set the environment variable
# ENV JWT_SECRET=my_custom_secret_key

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install express body-parser jsonwebtoken cookie-parser
# RUN npm install jsonwebtoken

# Copy the server script and static files
COPY server.js ./
COPY users.json ./
COPY index.html ./
COPY success.html ./

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD [ "node", "server.js" ]

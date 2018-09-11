FROM node:8-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# install required Node modules
# NOTE for production use use RUN npm install --only=production
RUN npm install --only=production

# Bundle app source
COPY . .

# Set various environment variables and setting for running node
ENV NODE_ENV production
USER node

# Default ports for the apps is 8080
EXPOSE 8080

# Mpore efficient in a container to run directly rather than via npm start
CMD [ "node", "./bin/www" ]



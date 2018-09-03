FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# install required Node modules
# NOTE for production use use RUN npm install --only=production
RUN npm install

# Bundle app source
COPY . .

# Default ports for the apps is 8080
EXPOSE 8080

CMD [ "npm", "start" ]



FROM node:8-alpine

# Build information
ARG GIT_OWNER
LABEL git_owner=$GIT_OWNER
ENV GIT_OWNER=$GIT_OWNER

ARG GIT_REPO
LABEL git_repo=$GIT_REPO
ENV GIT_REPO=$GIT_REPO

ARG GIT_BRANCH
LABEL git_branch=$GIT_BRANCH
ENV GIT_BRANCH=$GIT_BRANCH

ARG GIT_COMMIT
LABEL git_commit=$GIT_COMMIT
ENV GIT_COMMIT=$GIT_COMMIT

ARG BUILD_TIME
LABEL build_time=$BUILD_TIME
ENV BUILD_TIME=$BUILD_TIME

ARG CCS_VERSION
LABEL ccs_version=$CCS_VERSION
ENV CCS_VERSION=$CCS_VERSION

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



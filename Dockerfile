# Defines a base for our image
FROM node:20-alpine

# Sets the working directory for instructions (ADD, COPY, CMD, RUN and ENTRYPOINT)
WORKDIR /usr/src/app

# Executes the commands in a new layer on top of the current image and commits the result.
RUN npm install -g @angular/cli@13

# Copy all the files to the container
COPY package*.json ./
RUN npm ci

EXPOSE 4200

COPY . .
CMD ["ng", "serve", "--host", "0.0.0.0"]

# To execute: (You should be inside TFG-front directory)
# docker build --tag web-scrapping-front .
# docker run -p 4200:4200 web-scrapping-front

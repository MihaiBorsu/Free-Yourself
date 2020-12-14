# base image
FROM node:12.2.0-alpine

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

# set working directory
WORKDIR /app

# install and cache app dependencies
COPY package*.json ./
RUN npm install
RUN npm install mapbox-gl
COPY . .

# Expose Port

EXPOSE 4200

# # start app
# CMD ["ng", "serve", "--host", "0.0.0.0"]
# # start app
CMD ["npm", "start"]
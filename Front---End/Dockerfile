# FROM node:latest as node
# WORKDIR /app
# COPY . .

# RUN npm install
# RUN npm install mapbox-gl
# RUN npm install crypto-js --save
# RUN npm install @types/crypto-js
# RUN npm install @turf/turf

# RUN  ng build --prod

# FROM nginx:alpine
# COPY --from=node /app/dist/ /usr/share/nginx/html

# # EXPOSE 4200

# # CMD ["npm", "start"]










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
RUN npm install crypto-js --save
RUN npm install @types/crypto-js
RUN npm install @turf/turf
RUN npm run build
COPY . .

# Expose Port

EXPOSE 4200

CMD ["npm", "start"]
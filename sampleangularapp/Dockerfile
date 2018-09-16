FROM node as node

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
RUN npm install
COPY . /usr/src/app
ARG env=prod
RUN npm run build -- --prod

FROM nginx
COPY --from=node /usr/src/app/dist/ /usr/share/nginx/html
COPY nginx-custom.conf /etc/nginx/conf.d/default.conf

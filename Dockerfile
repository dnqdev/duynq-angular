FROM node:latest AS node
WORKDIR /app
# install config
COPY package*.json ./
RUN npm install -g npm@8.13.2 @angular/cli@13.3.1

#todo: check verion in package.json -> conflick angular/core 11 vs 13
RUN npm install

ENV PATH="./node_modules/.bin:$PATH"

#you source code
COPY ./ /app

# COPY ["./src/.well-known/","/usr/share/nginx/html/.well-known/"]
##your ckeditor5
RUN cd /app/src/assets/js/ckeditor && npm install && npm run build

RUN cd /app
RUN npm run build

FROM nginx

RUN apt-get update -y && apt-get install -y nano

COPY ./angular.nginx.conf /etc/nginx/conf.d/default.conf

# RUN echo "server {" >> /etc/nginx/conf.d/default.conf
# RUN echo "  listen 80;" >> "/etc/nginx/conf.d/default.conf"
# RUN echo "  server_name _;" >> "/etc/nginx/conf.d/default.conf"
# RUN echo "  location / {" >> "/etc/nginx/conf.d/default.conf"
# RUN echo "      root /usr/share/nginx/html;" >> "/etc/nginx/conf.d/default.conf"
# RUN echo "      try_files \$uri /index.html;" >> "/etc/nginx/conf.d/default.conf"
# RUN echo "      index  index.html index.htm;" >> "/etc/nginx/conf.d/default.conf"
# RUN echo "  }" >> "/etc/nginx/conf.d/default.conf"

# RUN echo "  error_page   500 502 503 504 404  /50x.html;" >> "/etc/nginx/conf.d/default.conf"
# RUN echo "  location = /50x.html {" >> "/etc/nginx/conf.d/default.conf"
# RUN echo "      root   /usr/share/nginx/html;" >> "/etc/nginx/conf.d/default.conf"
# RUN echo "  }" >> "/etc/nginx/conf.d/default.conf"

# RUN echo "}" >> "/etc/nginx/conf.d/default.conf"

COPY --from=node /app/dist/sov6-fe-admin /usr/share/nginx/html
# COPY ["./sov6-fe-admin/src/.well-known/","/usr/share/nginx/html/.well-known/"]

RUN apt-get -y clean

# config mmap for change API url in  /usr/share/nginx/html/assets/siteconfig.js

#docker build -t sov6-fe-admin .
#docker image rm tag docker.io/omtvn/sov6-fe-admin
#docker image tag sov6-fe-admin docker.io/omtvn/sov6-fe-admin
#docker push docker.io/omtvn/sov6-fe-admin

#docker login
#omtvn/4e33f5ed-487a-4f9c-8099-d2dc84203fbe

# your angular.js config prj file need add  "src/.well-known", for ssl cert verify
#    "polyfills": "src/polyfills.ts",
#                        "tsConfig": "tsconfig.app.json",
#                        "assets": [
#                            "src/.well-known",
#                            "src/favicon.ico",

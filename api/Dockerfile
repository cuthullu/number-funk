FROM node

MAINTAINER Thomas Hull

WORKDIR /home/mean
#Install Mean.js Prorequisites
RUN npm install -g grunt-cli

ADD package.json /home/mean/package.json
RUN npm install 

ADD . /home/mean

VOLUME ["/home/mean/server"]
CMD ["grunt", "nodemon"]

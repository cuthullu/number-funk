FROM node

MAINTAINER Thomas Hull
WORKDIR /home/mean
RUN npm install -g grunt-cli

ADD package.json /home/mean/package.json
RUN npm install 

ADD . /home/mean

VOLUME ["/home/mean/app"]
CMD ["npm", "start"]
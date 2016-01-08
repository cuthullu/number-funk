#Meal Planner

A meal planner using the mean stack with Angular 2 and docker

The project consists of three docker modules

##DB

A mongo db. Just utilizing the stock docker mongo image

##API

A node/express server built on a customisation of the stock docker node image

##Front End

An Angular 2 web app written in typescript.Built on a customisation of the stock docker node image and run with lite-server.



##Docker 

Api and front have a DockerFile that can be built and run independetly. In the base directory is docker-compose.yml allowing docker-compose to be used to build and run all three modules concurently using only:

```
$ docker-compose build

$ docker-compose up

```

Information on the installation of docker can be found [here](https://docs.docker.com/engine/installation/)

# Setup
## 1. Requirements
- docker
- docker-compose (included with docker desktop)

## Installation
There are two steps to run this application

### Run install
This step will:
- create nate-challenge dockr image
- install all npm dependencies for the project

Just run:
```
./run.sh install
```

### Run dev
This step will:
- run index.js of nate-challenge, running the HTTP server

Just run:
```
./run.sh dev
```

# Tip and tricks
You should **never** run NPM or node in any form on your host machine. Thus you should execute all commands on the docker container of nate-challenge, eg.

## SSH to container
This will:
- login you into nate-challenge container


Just execute (for Mac/Linux)
```
docker-exec -it nate-challenge /bin/bash
```
For Windows:
```
winpty docker exec -it nate-challenge bash
```
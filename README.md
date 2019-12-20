This webapplication was created as an engineering challenge for a junior backend position at nate.

# Setup
## 1. Requirements
- docker
- docker-compose (included with docker desktop)

## 2. Instalation

There are two steps to run this application

### A. Run install
This step will:
- create nate-api dockr image
- install all npm dependencies for the project

Just run:
```
./run.sh install
```

### B. Run dev
This step will:
- run index.js of nate-api, running the HTTP server

Just run:
```
./run.sh dev
```

##  3. SSH to container
This will:
- login you into nate-api container (for this the HTTP server has to be running)

Just execute (for Mac/Linux)
```
docker-exec -it nate-api /bin/bash
```
For Windows:
```
winpty docker exec -it nate-api bash
```
## 4. Usage

### A. Using the application
To access the application the HTTP server on docker must be running. While it is turned on the terminal you can enter the full aplication by entering:
```
localhost
```
on any webrowser (although I would advice against using Internet Explorer since it doesn't appear to display the aplication correctly).

You can manually enter the backend reply from a webrowser as well with:
```
http://localhost:3000/word-count?url=<any http:// address>
```
i.e.
```
http://localhost:3000/word-count?url=https://wp.pl
```

### B. Tests
The backend part of the application is tested using Jest. To run the tests you need to have the HTTP server on docker running and you need to log into the rooted container.

- To log into the nate-api container, which is the backend you need to execute:

for Mac/Linux:
```
docker-exec -it nate-api /bin/bash
```
for Windows:
```
winpty docker exec -it nate-webclient bash
```

While logged on this container you can run test coverage of the backend with:
```
npm run test-coverage
```

The frontend part of the application was not tested, as I didn't have enough time to implement it.

- To enter the container for frontend you also need to have the HTTP server on docker running.

Just execute (for Mac/Linux)
```
docker-exec -it nate-webclient /bin/bash
```
For Windows:
```
winpty docker exec -it nate-webclient bash
```

## 5. Choice of tech stack
The whole application was created using docker to decreese the need of installing packages used by it by an interested user. It also lowers the enviroment related issues allowing for a consistent experience for any user of this application.

### I. Backend
The API of this webapplication was written using Node.js. As a junior backend developer with a year's experience I haven't had the opportunity to learn any other language with enough depth to attempt creating this application.

Express.js was chosen as the best webaplication framework for Node.js. I don't believe there could be a better choice for this task in this language.

I have chosen Jest as it runs tests in parallel, improving how fast they are done. It also has build in mocking abilities which made tests for functions calling a URL adress easier and shorter to create.

I believe that for this challenge Python would have been a more optimal choice, as sadly with JavaScript engine this webapplication struggles when a larger DOM website is chosen. Sadly, with a short deadline it was impossible for me to try and learn this language enough to chose an unknown for me language.

### II. Frontend
As a backend engineer with nearly none experience in frontend I decided to chose React, as it felt the most similar to what I know.
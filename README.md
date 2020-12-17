# About
This webapplication was created as an engineering challenge for a Junior Backend position at **nate**.
It consists of:
- webapp built in React
- RESTful API built with nodejs & epxressjs

# Setting up

## 1. Requirements
Local development is setup using Docker, you will need to have the following installed on your host machine:
- docker
- docker-compose (included with docker desktop)

## 2. Installation

There are two steps to run this application

#### 2.1. Run install
This step will:
- build nate-api & nate-webclient docker images
- install npm dependencies for nate-api & nate-webclient

Simply run the following in your terminal:
```
./run.sh install
```
If an error will occur, run first:
```
chmod +x run.sh
```

#### 2.2. Run local development
This step will:
- start nate-api & nate-webclient docker containers
- make webclient & API available over HTTP

Simply run the following in your terminal:
```
./run.sh dev
```

# Usage

## 1. Accessing the application
To access the application you will have to have both the docker containers running (see 
[Setting up section](#setting-up) ).

You can access:
- [webclient under localhost:80](http://localhost:80)
- [RESTful API under localhost:3000](http://localhost:3000/word-count)


## 2. Running Tests & Test coverage

### 2.1. Backend/API tests
The backend part of the application is tested using **Jest**. To run the tests you need to login to nate-api container:

- for Mac/Linux:
```
docker-exec -it nate-api /bin/bash
```
- for Windows:
```
winpty docker exec -it nate-webclient bash
```

Simply run the following on the container after logging in:
```
npm run test-coverage
```
### 2.2. Frontend tests
The frontend part of the application was not tested well. There is a single unit test for a form. I was in a process of learning how to test the React components but I ran out of time :o

- To enter the container for frontend you also need to have the HTTP server on docker running.

Just execute (for Mac/Linux)
```
docker-exec -it nate-webclient /bin/bash
```
For Windows:
```
winpty docker exec -it nate-webclient bash
```

Simply run the following on the container after logging in:
```
npm run test
```

# Q&A
## Why did I choose this technical stack
### 1.1. Infrastructure
Infrastructure/setup was built using Docker. This was done to unify the setup **all across** the environments, including having the same setup for the person checking this test at nate :) Additional benefit is how simple and automated the setup is.
The same setup can be used easilly to deploy to a cloud service like AWS as well with the same benefits.

### 1.1. API/Backend
- The API of this application was written using Node.js and ExpressJS. Since I'm a Junior Backend developer with a single year of experience I haven't had the opportunity to learn any other language, except for javascript, well enough to consider it.
- Express.js was chosen as it is widely used, well documented and performant.
- I have chosen Jest for my testing framework as it runs tests in parallel, improving how fast they are done. It also has build in mocking abilities which made tests for functions calling a URL adress easier and shorter to create. Again it's widely used and supported by the community

I believe that for this challenge Python would have been a more optimal choice as it was made for data manipulation. Sadly, with a short deadline it was impossible for me to try and learn this language enough to chose an unknown for me language.

### 1.2. Frontend
- As a backend engineer with nearly no experience in frontend I decided to chose React as it's well documented, easy to grasp and further maintain
- Again I have chosen Jest as my testing framework for the same reasons as I did for backend
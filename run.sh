#!/bin/bash

if [ "$1" == "install" ]; then
    printf "\e[1;33;4;44mBuilding images & installing dependencies\e[0m\n"
    env SSH_PRIVATE_KEY="~/.ssh/id_rsa" docker-compose -f docker-compose.builder.yml build
    env SSH_PRIVATE_KEY="~/.ssh/id_rsa"  docker-compose -f docker-compose.builder.yml up
    exit 0
fi

if [ "$1" == "dev" ]; then
    printf "\e[1;33;4;44mRunning local dev containers\e[0m\n"
    env SSH_PRIVATE_KEY="~/.ssh/id_rsa" docker-compose up
    exit 0
fi

if [ "$1" == "build" ]; then
    printf "\e[1;33;4;Rebuild all local dev containers\e[0m\n"
    docker-compose build
    exit 0
fi


if [ "$1" == "stop" ]; then
    printf "\e[1;33;4;Stopping all local dev containers\e[0m\n"
    docker stop $(docker ps -a -q)
    exit 0
fi

printf "\e[\e[101mCommand not recognised. Allowed commands: install, dev, stop \e[0m\n"
exit 1
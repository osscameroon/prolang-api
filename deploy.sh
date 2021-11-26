#!/bin/bash

start=$(date +"%s")

ssh -p ${SPORT} ${SUSER}@${SNAME} -i key.txt -t -t -o StrictHostKeyChecking=no << 'ENDSSH'
cd prolang

docker pull tericcabrel/prolang-api:latest

API_CONTAINER_NAME=prolang-api
if [ "$(docker ps -qa -f name=$API_CONTAINER_NAME)" ]; then
    if [ "$(docker ps -q -f name=$API_CONTAINER_NAME)" ]; then
        echo "[API] Container is running -> stopping it..."
        docker stop $API_CONTAINER_NAME;
    fi
    docker rm $API_CONTAINER_NAME;
fi

docker run -d -p 5700:5700  -v $(pwd)/logs:/app/logs --name prolang-api --rm --env-file .env tericcabrel/prolang-api:latest

exit
ENDSSH

end=$(date +"%s")

diff=$(($end - $start))

echo "Deployed in : ${diff}s"
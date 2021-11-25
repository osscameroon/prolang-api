#!/bin/bash

start=$(date +"%s")

ssh -p ${SPORT} ${SUSER}@${SNAME} -i key.txt -t -t -o StrictHostKeyChecking=no << 'ENDSSH'
cd prolang

docker pull tericcabrel/prolang-api:latest

docker run -d -p 5700:5700  -v $(pwd)/logs:/app/logs --name prolang-api --rm --env-file .env tericcabrel/prolang-api:latest

exit
ENDSSH

end=$(date +"%s")

diff=$(($end - $start))

echo "Deployed in : ${diff}s"
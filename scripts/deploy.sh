#!/bin/bash

#as default we have the repo name which the user will download it like but if the name changes he can rename it.
CLIENTFILENAME="pesonal-web-page-v3-client"

#Getting the full dir name of the script no matter where we call the script from.
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

#checking if the .env file exists in order for the env variables to be accessible
if [[ ! -f "../src/.env" ]]
then
  echo "You have to specify a .env file"
  exit 1
fi

#Deleting the previews server build and rebuilding it so we will have the latest version
#and then we point our script to the root folder of the project if this fails we exit with exit code 1
rm -rf "../build" && cd .. && npm run build || exit 1
echo "Done Building Server!!"

#Checking if the client dir exists where we should have it
if [[ ! -d "$SCRIPT_DIR/../../$CLIENTFILENAME" ]]
then
  echo "The client name is not set right or you dont have the client at the right location!"
fi

cd "$SCRIPT_DIR/../../$CLIENTFILENAME"

###AT THE CLIENT FILE###
# Update client
git pull
# Build client for production
npm ci
npm run build

cd "$SCRIPT_DIR"
rm -rf ../client
cp -r "$SCRIPT_DIR/../../$CLIENTFILENAME/dist" "../client"
echo "Done building client!!!"



#if [[ ! -d "$SCRIPT_DIR/../docker/docker-compose.prod.yml" ]]
#then
#  docker-compose -p thanos-page --env-file ../src/.env -f ../docker/docker-compose.prod.yml up --build -d
#fi

#If script runs successfully exiting with code 0
exit 0
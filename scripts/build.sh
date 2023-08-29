#!/bin/bash

#Getting the full dir name of the script no matter where we call the script from.
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

# Set relative path context
cd "$SCRIPT_DIR/.."

###PREBUILD STAGE###

#checking if the .env file exists in order for the env variables to be accessible
if [[ ! -f "src/.env" ]]
then
  echo "You have to specify a .env file"
  exit 1
fi


###SERVER BUILD###
npm ci
npm run build || exit 1
echo "Done Building Server!!"

cd "$SCRIPT_DIR/../client"

###CLIENT BUILD###
npm ci
npm run build || exit 1
cp -r "$SCRIPT_DIR/../client/dist" "$SCRIPT_DIR/../build/client"
echo "Done building client!!!"

exit 0
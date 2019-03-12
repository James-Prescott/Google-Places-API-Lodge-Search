#!/usr/bin/env bas
echo "This script will install all dependancies and run the project for you."
break
cd server && npm install
cd ../client && npm install
echo "Enter your API key"
read APIKEY
APIKEY=$APIKEY node ../server/bin/www | ng test | ng serve --open
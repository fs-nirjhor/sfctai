#!/bin/bash
set -e

echo "Deployment started..."

# Pull the latest version of the app
echo "Pulling changes..."
git pull
echo "New changes copied to server Successfully!"

echo "Configuring NPM..."
export NVM_DIR=~/.nvm
source ~/.nvm/nvm.sh
echo "NPM configured Successfully!"

echo "Creating Production Build..."
npm run build
echo "Build Successfully!"

echo "PM2 Reloading.."
pm2 reload sfctai_server
echo "PM2 Reload Successfully!"

echo "Deployment Finished!"
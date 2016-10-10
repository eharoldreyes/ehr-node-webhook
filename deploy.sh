cd /home/eharoldreyes/Documents/Workspaces-web/node-boilerplate/

#echo "Stopping Server"
#echo "====================================="
#forever stop app.js

echo "Updating Code"
echo "====================================="
git fetch
git pull origin master

echo "Installing Dependencies"
echo "====================================="
npm install

echo "Generate Documentation"
echo "====================================="
npm run docs

echo "Restart server"
echo "====================================="
forever restart app.js
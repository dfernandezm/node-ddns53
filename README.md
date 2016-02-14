# Node DDNS53
Service to update Amazon Route 53 hosted zones with the current public IP

## Install as a service

```
npm install -g forever
npm install -g forever-service
sudo forever-service install -s app.js --start node-ddns53
```

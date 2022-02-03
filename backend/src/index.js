const Server = require('./server/server')

require('dotenv').config()

const server = new Server()
server.startServer();

const a = []
if(a.length > 0){
    console.log(true);
}
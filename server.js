const Server = require('aliv');

new Server({quiet: true, port: process.env.PORT || 3000, secure: true, pathIndex: "client/dev", only: "client/dev/**/*"}).start();

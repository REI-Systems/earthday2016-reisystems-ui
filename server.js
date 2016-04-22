const Server = require('aliv');

new Server({quiet: true, port: 8080, pathIndex: "client/dev", only: "client/dev/**/*"}).start();

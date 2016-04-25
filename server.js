var express = require('express');
var app = express();
var path = require('path');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/client/dev'));

// viewed at http://localhost:8080
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/client/dev/index.html'));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

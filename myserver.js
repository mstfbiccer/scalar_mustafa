var express = require('express')
var app = express();

app.use('/', express.static(__dirname + '/'));
app.listen(2016, function () {
  console.log('Example app listening on port 2016!');
  console.log(__dirname);
});
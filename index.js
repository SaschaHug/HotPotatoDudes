var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
app.use(bodyParser.json());

const PORT = 3000;

var Login = require('./routes/login.js');
var Blog = require('./routes/blog.js');

app.use('/api/V1/', Login);
app.use('/api/V1/blog', Blog);

/* Server starten */
app.listen(PORT, function () {
  console.log('Server running at: 127.0.0.1:3000!');
});

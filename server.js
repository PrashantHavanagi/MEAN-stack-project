var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/webdev-project'));

//require ("./test/app.js")(app);

// var assignment = require("./webdev-project/app.js");
// assignment(app);

var port = process.env.PORT || 3000;

app.listen(port);
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var webServer = express();
var handlebars = require('handlebars');
var jsonfile = require('jsonfile')

var config = {
    "jsonFile": "",
    "templateFile": ""
};

webServer.use(express.static('server/static'));
webServer.use(bodyParser.json());
webServer.use(bodyParser.urlencoded({extended: false}));
webServer.listen(20755);
webServer.get('/', function (req, res) {
    var templateSource = fs.readFileSync(config.templateFile).toString();
    var template = handlebars.compile(templateSource);
    res.send(template(jsonfile.readFileSync(config.jsonFile)));
});

webServer.post('/updateConfig', function (req, res) {
    config = req.body;
    res.end();
});
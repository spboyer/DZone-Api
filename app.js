/*
* Module dependencies.
* - https://npmjs.org/package/memory-cache
*/

var express = require('express')
, routes = require('./routes')
, user = require('./routes/user')
, cheerio = require('cheerio')
, http = require('http')
, request = require('request')
, path = require('path')
, rss = require('./rss').rss
, zones = require('./zones').zones;

var app = express();

app.configure(function() {
    app.set('port', process.env.PORT || 3001);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
    app.use(express.errorHandler());
});

// rout configuration and really the controller mappings. could abstract further if need be
app.get('/', routes.index);

app.get('/api/zones', function (req, res) {
    res.send(200, zones.all());
    res.end(200);
});

app.get('/api/zones/:name', function (req, res) {
    var z = zones.get(req.params.name);
    rss.feed(z, function (result) {
        res.send(200, result);
    });
});

app.get('/api/authors/:name', function(req, res) {
      
    res.send(200, req.params.name);
});

app.get('/api/search/:arg', function (req, res) {
    // search all sections, articles and categories returning a list of articles
    // could play pretty nice.
});

http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});
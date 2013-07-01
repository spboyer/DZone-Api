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
, zones = require('./zones').zones
, model = require('./model')
, async = require('async');

var app = express();

app.configure(function() {
    app.use(express.compress());
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

app.all('/', function(req, res, next) {
  console.log('in all');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });
 
// rout configuration and really the controller mappings. could abstract further if need be
app.get('/', routes.index);

app.get('/api/zones', function (req, res) {
    res.type('application/json');
    res.send(200, zones.all());
   // res.end(200);
});

app.get('/api/zones/:name', function (req, res) {

    var z = zones.get(req.params.name);
    rss.feed(z, function (result) {
        z.updated(new Date());
        res.type('application/json');
        res.send(200, result);
    });
});


app.get('/api/summary', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "X-Requested-With");
  
    var areas = [];
    var myzones = zones.all();

    for (var i = 0; i < myzones.length; i++) {
        areas[i] = myzones[i].name;
    }

    //var areas = ['main', 'html5', 'mobile', 'dotnet', 'cloud', 'windows phone'];
    var sections = [];
    var results = [];
    var feed = function (area, callback) {
        var z = zones.get(area);
       
        rss.feed(z, function (result) {
            //console.log(z.name);
            z.updated(new Date());

            var res = result;
            if (res.articles.length > 5) {
                //res.articles = res.articles.slice(0, 5);
            }

            
            results[areas.indexOf(z.name)] = res;
            //results.push(res);
            callback(null);
        });
    };

    async.forEach(areas, feed, function (err) {
        //console.log('done');

        
        res.type('application/json');
        res.send(200, results);
    });

    //--> Syncronous code
    //for (var i = 0; i < areas.length; i++) {
    //    var z = zones.get(areas[i]);
    //    z.updated(new Date());
    //    sections.push(z);
    //}

    //rss.summary(sections, function(result) {
        
    //    res.type('application/json');
    //    res.send(200, result);
    //});
    
});


app.get('/api/authors/:name', function(req, res) {
    //res.send(200, req.params.name);

    rss.author(req.params.name, function (result) {
        res.type('application/json');
        res.send(200, result);
    });
});

app.get('/api/search/:arg', function (req, res) {
    // search all sections, articles and categories returning a list of articles
    // could play pretty nice.
});

http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});
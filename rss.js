var rss = (function () {
    // var privateVar = 'private hi';
    var cheerio = require('cheerio')
    , request = require('request')
    , model = require('./model');

    //function internal() {
    //    // ...
    //}

    return {
        // public interface

        // sayHi1: function () {
        //   // all private members are accesible here
        //   return "Hello say hi 1";
        // },
        // sayHi2: function () {
        // 	return privateVar;
        // }



        feed: function (zone, respond) {
           
            // request object, user-agent is the magic key. if not set you may get 403.
            var options = {
                host: "dzone.com",
                port: 80,
                uri: "",
                headers: {
                    Host: "dzone.com",
                    "User-Agent": "DZone"
                }
            };

            options.uri = zone.url;
           
            var result;
            result = new model.feed(zone.name, zone.url);


            request(options, function (err, response, body) {

                result.articles = new Array();
                
                //Just a basic error check
                if (err && response.statusCode !== 200) {
                    console.log('Request error.');
                }

                var $ = cheerio.load(body, {
                    ignoreWhitespace: true,
                    xmlMode: true,
                    lowerCaseTags: true
                });

                //console.log(body);

                $('item').each(function (i, item) {
                    var title = $(item).find('title').text();
                    var summary = $(item).find('description').text();
                    var link = $(item).find('link');

                    if (link === null) {
                        console.log('cannot find link node');
                    } else {
                        l = link.text();
                    }

                    var pubDate = $(item).find('pubdate');
                   
                    var d = '';
                    if (pubDate !== null) {
                        d = pubDate.text();
                    }

                    var c = $(item).find('dz\\:commentcount').text();
                    var v = $(item).find('dz\\:readcount').text();
                    var thumb = $(item).find('dz\\:thumbnail').text();
                    var submitter = $(item).find('dz\\:submitter');

                    var user = '';
                    var pic = null;
                    if (submitter.length === 0) {
                        user = $(item).find('dc\\:creator').text();
                    } else {
                        user = $(submitter).children().first().text();
                        pic = $(submitter).children().next().next().text();
                    }

                    var g = $(item).find('guid').text().split('at')[0];

                    g = g.toString().replace('node', '').trim();

                    var cats = [];

                    $('category').each(function (c, cat) {
                        cats[c] = $(cat).text();
                    });

                   // console.log(title);

                    var a =  new model.article(
                        title,
                        summary,
                        thumb,
                        new Date(d),
                        l,
                        Number(c),
                        Number(v),
                        user,
                        pic,
                        cats,
                        Number(g));
                   // console.log(i);

                    result.addArticle(a);
                });
                //console.log(result);
               respond(result);
            });

            
            
            
        }
    }
})();


exports.rss = rss;



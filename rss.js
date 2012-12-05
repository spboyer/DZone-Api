var rss = (function () {
    // private vars
    var userRss = 'http://www.dzone.com/users/~id/rss';

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

    var cheerio = require('cheerio')
    , request = require('request')
    , model = require('./model')
    , cache = require('memory-cache');

    //function internal() {
    //    // ...
    //}

    return {
        // public interface
        feed: function (zone, respond) {

            options.uri = zone.url;
           
            var result;

            console.log('checking cache');

            result = cache.get(zone.name);

            if (result !== null) {
                console.log('found in cache');

                respond(result);
                return;
            } else {
                console.log('not found in cache');

                result = new model.feed(zone.name, zone.url);
            }

            request(options, function (err, response, body) {
                
                //Just a basic error check
                if (err && response.statusCode !== 200) {
                    console.log('Request error.');
                }

                var $ = cheerio.load(body, {
                    ignoreWhitespace: true,
                    xmlMode: true,
                    lowerCaseTags: true
                });

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

                    var g = $(item).find('guid').text()

                    var cats = [];

                    $('category').each(function (c, cat) {
                        cats[c] = $(cat).text();
                    });

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
                        g);

                    result.addArticle(a);
                });
                console.log('putting in cache');
                //cache.put(zone.name, result, 3600000);
                cache.put(zone.name, result, 3600000);

               respond(result);
            });

        },
        author: function (id, respond) {

            var author; 

            author = cache.get(id);

            if (author !== null) {
                respond(author);
                return;
            }

            options.uri = userRss.replace('~id', id);

            request(options, function (err, response, body) {

                //Just a basic error check
                if (err && response.statusCode !== 200) {
                    console.log('Request error.');
                }

                // console.log(body);

                var $ = cheerio.load(body, {
                    ignoreWhitespace: true,
                    xmlMode: true,
                    lowerCaseTags: true
                });

                var source = $(body);

                var twitter = source.find('twitter').text();
                var git = source.find('github').text();
                var goog = source.find('googleplus').text();
                var fb = source.find('facebook').text();
                var lin = source.find('linkedin').text();
                var bio = source.find('bio').text();
                var pic = source.find('picture').text();

                author = new model.author(id, twitter, bio, pic);
                author.setSocial(git, goog, fb, lin);
                
                //console.log(author);

                $('item').each(function (i, item) {
                    var title, summary, published, url, picture, guid;

                    var art = $(item);

                    title = art.find('title').text();
                    summary = art.find('description').text();
                    published = art.find('pubDate').text();
                    url = art.find('link').text();
                    picture = art.find('dz\\:thumbnail').text();
                    guid = $(item).find('guid').text();

                    var a = new model.headline(title, summary, Date(published), url, picture, guid);

                    author.addHeadline(a);
                });


                cache.put(id, author, 3600000);

                respond(author);
            });
        }
    }
})();


exports.rss = rss;



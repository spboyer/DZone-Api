var zone = (function () {
    function zone(name, url, title) {
        this.name = name;
        this.url = url;
    }
    zone.prototype.updated = function (d) {
        this.lastUpdate = d;
    };
    return zone;
})();
var article = (function () {
    function article(title, summary, thumb, published, url, comments, views, submitter, picture, categories, guid) {
        this.title = title;
        this.summary = summary;
        this.thumb = thumb;
        this.published = published;
        this.url = url;
        this.comments = comments;
        this.views = views;
        this.submitter = submitter;
        this.picture = picture;
        this.categories = categories;
        this.guid = guid;
        if(this.picture !== null) {
            this.print_url = this.picture.substring(0, this.picture.indexOf('.com/') + 5) + 'print/' + guid.toString();
        } else {
            this.print_url = this.url.substring(0, this.url.indexOf('.com/') + 5) + 'print/' + guid.toString();
        }
    }
    return article;
})();
var feed = (function () {
    function feed(name, url) {
        this.name = name;
        this.url = url;
        this.articles = [];
    }
    feed.prototype.addArticle = function (a) {
        this.articles.push(a);
    };
    return feed;
})();
var headline = (function () {
    function headline(title, summary, published, url, picture, guid) {
        this.title = title;
        this.summary = summary;
        this.published = published;
        this.url = url;
        this.picture = picture;
        this.guid = guid;
        if(this.picture !== null) {
            this.print_url = this.picture.substring(0, this.picture.indexOf('.com/') + 5) + 'print/' + guid.toString();
        } else {
            this.print_url = this.url.substring(0, this.url.indexOf('.com/') + 5) + 'print/' + guid.toString();
        }
    }
    return headline;
})();
var author = (function () {
    function author(bio, picture, twitter, articles) {
        this.bio = bio;
        this.picture = picture;
        this.articles = articles;
        if(twitter.substring(0, 1) !== '@') {
            this.twitter = '@' + twitter.trim();
        }
    }
    return author;
})();
var exports;
exports.zone = zone;
exports.article = article;
exports.author = author;
exports.headline = headline;
exports.feed = feed;

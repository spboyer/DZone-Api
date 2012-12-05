var zone = (function () {
    function zone(name, url, title) {
        this.name = name;
        this.url = url;
        this.lastUpdate = null;
    }
    zone.prototype.updated = function (d) {
        this.lastUpdate = d;
    };
    return zone;
})();
var article = (function () {
    function article(title, summary, thumb, published, url, comments, views, submitter, picture, categories, guidStr) {
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
        var parts = guidStr.split('at');
        this.guid = Number(parts[0].toString().trim().replace('node', ''));
        this.print_url = parts[1].toString().trim() + 'print/' + this.guid.toString();
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
    function headline(title, summary, published, url, picture, guidStr) {
        this.title = title;
        this.summary = summary;
        this.published = published;
        this.url = url;
        this.picture = picture;
        var parts = guidStr.split('at');
        this.guid = Number(parts[0].toString().trim().replace('node', ''));
        this.print_url = parts[1].toString().trim() + 'print/' + this.guid.toString();
    }
    return headline;
})();
var author = (function () {
    function author(id, twitter, bio, picture) {
        if (typeof twitter === "undefined") { twitter = ''; }
        if (typeof bio === "undefined") { bio = ''; }
        if (typeof picture === "undefined") { picture = ''; }
        this.id = id;
        this.bio = bio;
        this.picture = picture;
        this.github = '';
        this.facebook = '';
        this.google = '';
        this.linkedin = '';
        if(twitter.substring(0, 1) !== '@') {
            this.twitter = '@' + twitter.trim();
        }
        this.articles = [];
    }
    author.prototype.setSocial = function (git, goog, fb, lin) {
        this.github = git;
        this.facebook = fb;
        this.linkedin = lin;
    };
    author.prototype.addHeadline = function (entry) {
        this.articles.push(entry);
    };
    return author;
})();
var exports;
exports.zone = zone;
exports.article = article;
exports.author = author;
exports.headline = headline;
exports.feed = feed;

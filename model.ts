
class zone {
    public lastUpdate: Date = null;

    constructor(public name : string, public url : string, 
        title : string) {

    };

    updated(d: Date) {
        this.lastUpdate = d;
    };
}


class article {
    // url of the print version of the article that is used in the client apps
    public print_url: string;
    // unique identifier of the article
    public guid: number;

    constructor (
                // title or headline of the article
                public title: string,
                // summary or intro text
                public summary: string,
                // img to dispay with the headline
                public thumb: string,
                // publish date
                public published: Date,
                // web browser url 
                public url: string,
                // number of comments on the article
                public comments: number,
                // number of views on the article
                public views: number,
                // author of the article, the username
                public submitter: string,
                // author profile image
                public picture: string,
                // tags
                public categories: string[], guidStr : string) {

        //if (this.picture !== null) {
        //    this.print_url = this.picture.substring(0, this.picture.indexOf('.com/') + 5) + 'print/' + guid.toString();
        //} else {
        //   this.print_url = this.url.substring(0, this.url.indexOf('.com/') + 5) + 'print/' + guid.toString();
        //}

        var parts = guidStr.split('at');
        this.guid = Number(parts[0].toString().trim().replace('node', ''));
        this.print_url = parts[1].toString().trim() + 'print/' + this.guid.toString();
    }
}

class feed {
    public articles: article[];
    constructor(public name : string, public url : string) {
        this.articles = [];
    }

    addArticle(a : article) {
        this.articles.push(a);
    }
}

// class that is returned with the author class
class headline {
    public print_url: string;
    public guid: number;

    constructor(public title : string,
                public summary : string,
                public published : Date,
                public url : string,
                public picture : string, guidStr : string) {

        //if (this.picture !== null) {
        //    this.print_url = this.picture.substring(0, this.picture.indexOf('.com/') + 5) + 'print/' + guid.toString();
        // } else {
        //   this.print_url = this.url.substring(0, this.url.indexOf('.com/') + 5) + 'print/' + guid.toString();
        //}
        var parts = guidStr.split('at');
        this.guid = Number(parts[0].toString().trim().replace('node', ''));
        this.print_url = parts[1].toString().trim() + 'print/' + this.guid.toString();
    }
}

// http://www.dzone.com/users/spboyer/rss
class author {
    public twitter: string;
    public github: string = '';
    public facebook: string = '';
    public google: string = '';
    public linkedin: string = '';
    public articles: headline[];
    constructor (public id : string, twitter: string = '', public bio: string = '',
                public picture: string = '') {
        if (twitter.substring(0,1) !== '@'){
            this.twitter = '@' + twitter.trim();
        }

        this.articles = [];
    }

    setSocial(git : string, goog : string, fb : string, lin : string) {
        this.github = git;
        this.facebook = fb;
        this.linkedin = lin;
        };

        addHeadline(entry: headline) {
            this.articles.push(entry);
        };
}


// setup the exports for node module
var exports;
exports.zone = zone;
exports.article = article;
exports.author = author;
exports.headline = headline;
exports.feed = feed;
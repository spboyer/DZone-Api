class zone {
    public lastUpdate: Date;

    constructor(public name : string, public url : string, 
        title : string) {

    };

    updated(d: Date) {
        this.lastUpdate = d;
    };
}


class article {

    public print_url: string;

    constructor(public title : string, 
                public summary : string,
                public thumb : string,
                public published : Date, 
                public url : string,
                public comments : number,
                public views : number,
                public submitter : string,
                public picture : string,
                public categories : string[],
                public guid : number) {

        if (this.picture !== null) {
            this.print_url = this.picture.substring(0, this.picture.indexOf('.com/') + 5) + 'print/' + guid.toString();
        } else {
           this.print_url = this.url.substring(0, this.url.indexOf('.com/') + 5) + 'print/' + guid.toString();
        }
    }
}

class feed {
    public articles: article[];
    constructor(public name : string, public url : string) {
        this.articles = [];
    }

    addArticle(a : article) {
        this.articles.push(a);

        //console.log('article count:' + this.articles.length.toString());
    }
}

class headline {
    public print_url: string;

    constructor(public title : string,
                public summary : string,
                public published : Date,
                public url : string,
                public picture : string,
                public guid : number) {

        if (this.picture !== null) {
            this.print_url = this.picture.substring(0, this.picture.indexOf('.com/') + 5) + 'print/' + guid.toString();
         } else {
           this.print_url = this.url.substring(0, this.url.indexOf('.com/') + 5) + 'print/' + guid.toString();
        }
    }
}

// http://www.dzone.com/users/spboyer/rss
class author {
    public twitter: string;
    constructor (public bio: string,
                public picture: string,
                twitter: string,
                public articles: headline[]) {
        if (twitter.substring(0,1) !== '@'){
            this.twitter = '@' + twitter.trim();
        }
    }
}


// setup the exports for node module
var exports;
exports.zone = zone;
exports.article = article;
exports.author = author;
exports.headline = headline;
exports.feed = feed;
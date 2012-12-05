var collections = require("./collections").collections;
var model = require("./model");

var zone = model.zone;
/*
  zones
*/


var dzones = (function() {
  // var privateVar = 'private hi';
  var zones = new collections.keyValueCollection();
  var initialized = false;


  function init () {
    // ...
      if (!initialized) {
        zones.add(new collections.item("main", new zone("main", "http://www.dzone.com/rss.xml", "Main")));
        zones.add(new collections.item("agile", new zone("agile", "http://feeds.dzone.com/zones/agile", "Agile")));
        zones.add(new collections.item("mobile", new zone("mobile", "http://mobile.dzone.com/rss.xml", "Mobile")));
        zones.add(new collections.item("java lobby", new zone("java lobby", "http://feeds.dzone.com/javalobby/frontpage", "Java Lobby")));
        zones.add(new collections.item("web builder", new zone("web builder", "http://feeds.dzone.com/zones/css", "Web Builder")));
        zones.add(new collections.item("php", new zone("php", "http://feeds.dzone.com/zones/php", "PHP")));
        zones.add(new collections.item("groovy", new zone("groovy", "http://feeds.dzone.com/zones/groovy", "Groovy")));
        zones.add(new collections.item("python", new zone("python", "http://feeds.dzone.com/zones/python", "Python")));
        zones.add(new collections.item("ruby", new zone("ruby", "http://feeds.dzone.com/zones/ruby", "Ruby")));
        zones.add(new collections.item("architects", new zone("architects", "http://feeds.dzone.com/zones/architects", "Architects")));
        zones.add(new collections.item("books", new zone("books", "http://feeds.dzone.com/zones/books", "Books")));
        zones.add(new collections.item("windows phone", new zone("windows phone", "http://dzone.com/mz/windowsphone/rss", "Windows Phone")));
        zones.add(new collections.item("cloud", new zone("cloud", "http://dzone.com/mz/cloud/rss", "Cloud")));
        initialized = true;
    }
  }

  return { // public interface
    
    // sayHi1: function () {
    //   // all private members are accesible here
    //   return "Hello say hi 1";
    // },
    // sayHi2: function () {
    // 	return privateVar;
    // }

      all: function() {
          init();
          return zones.all();
      },
      
      get: function (n) {
        init();
        return zones.get(n);
      }
  };
})();


exports.zones = dzones;

	

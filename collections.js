var collections;
(function (collections) {
    var item = (function () {
        function item(key, value) {
            this.key = key;
            this.value = value;
        }
        return item;
    })();
    collections.item = item;    
    var keyValueCollection = (function () {
        function keyValueCollection() {
            this.collection = {
            };
            this.count = 0;
            this.keys = new Array();
        }
        keyValueCollection.prototype.add = function (item) {
            this.keys.push(item.key);
            this.collection[item.key] = item.value;
            this.count = this.count + 1;
        };
        keyValueCollection.prototype.get = function (key) {
            var val = this.collection[key];
            if(val != null) {
                return val;
            }
            return null;
        };
        keyValueCollection.prototype._get = function (key) {
            var val = this.collection[key];
            if(val != null) {
                return new collections.item(key, val);
            }
            return null;
        };
        keyValueCollection.prototype.all = function () {
            var values = new Array();
            for(var i = 0; i < this.keys.length; i++) {
                values.push(this._get(this.keys[i]).value);
            }
            return values;
        };
        keyValueCollection.prototype.remove = function (key) {
            if(delete this.collection[key]) {
                this.count = this.count - 1;
                var i = this.keys.indexOf(key);
                this.keys.splice(i);
            }
        };
        return keyValueCollection;
    })();
    collections.keyValueCollection = keyValueCollection;    
})(collections || (collections = {}));
var exports;
exports.collections = collections;

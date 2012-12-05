module collections{

	export class item {
        constructor (public key: string, public value: any){	
        }
	}

	export class keyValueCollection {
		private collection = {};
		private keys : string[];
		public count : number;
		constructor(){
			this.count = 0;
			this.keys = new string[];
		};
		
		add(item : collections.item){
			// add the key to the keys array
			this.keys.push(item.key);
			// add the item to the collection
			this.collection[item.key] = item.value;
			//increment the count property
			this.count = this.count + 1;
		}	
		
		get (key : string) : collections.item {
			var val : any = this.collection[key];
			
			if (val != null) {
				return val;
			}
			
			return null;
		}

		private _get(key: string) : collections.item {
            var val : any = this.collection[key];
			
			if (val != null) {
				return new collections.item(key, val);
			}
			
			return null;
		}

        all () : collections.item[] {
            var values = new Array();
            for (var i = 0; i < this.keys.length;i++){
                values.push(this._get(this.keys[i]).value);
            }
            return values;
        };

		
		remove(key:string) : void {
			if (delete this.collection[key]){
				this.count = this.count - 1;
				var i = this.keys.indexOf(key);
				this.keys.splice(i);
			}
			
		} 
		
        
	}		
}

var exports;
exports.collections = collections;
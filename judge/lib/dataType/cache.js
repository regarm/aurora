//Time bounded memory cache (Inspired by : [node-cache](https://github.com/ptarjan/node-cache))
//Default timeOut is infinity.
//
// ********
// 1. [put](#put)
// 2. [del](#del)
// 3. [clear](#clear)
// 4. [get](#get)
// 5. [empty](#empty)
// ********


//
function Cache(timeOut){
	var self = this;
	var cache = Object.create(null);
	var size = 0;

	if (typeof timeOut !== 'undefined' && (typeof timeOut !== 'number' || isNaN(timeOut) || timeOut <= 0)) {
		throw new Error('Cache timeout must be a positive number');
	}

	//<a name="put"> </a>
	self.put = function put(key, val){
		if(cache[key]){
			self.del(key);
		}
		var record = {
			value: val,
			expire: timeOut + Date.now()
		}
		if(timeOut != 0 && !isNaN(record.expire)){
			record.timeout = setTimeout(function (){
				self.del(key);
			}, timeOut);
		}

		++size;
		cache[key] = record;
	}

	//<a name="del"> </a>
	self.del = function del(key){
		var oldRecord = cache[key];
		if(oldRecord && oldRecord.timeout){
			clearTimeout(cache[key].timeout);
		}
		--size;
		delete cache[key];
	}

	//<a name="clear"> </a>
	self.clear = function clear(){
		for (var key in cache){
			if(cache[key].timeout){
				clearTimeout(cache[key].timeout);
			}
		}
		delete cache;
		size = 0;
		cache = Object.create(null);
	}
	
	//<a name="get"> </a>
	self.get = function get(key){
		if(cache[key]){
			return cache[key].value;
		} else return null;
	}

	//<a name="empty"></a>
	self.empty = function empty(){
		return (size == 0);
	}

}
module.exports = Cache;
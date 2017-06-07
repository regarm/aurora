//Time bounded memory cache (Inspired by : [node-cache](https://github.com/ptarjan/node-cache))
//
//
// ********
// 1. [put](#put)
// 2. [del](#del)
// 3. [clear](#clear)
// 4. [get](#get)
// ********


//
function Cache(timeOut){
	var self = this;
	var cache = Object.create(null);

	if (typeof timeOut !== 'undefined' && (typeof timeOut !== 'number' || isNaN(timeOut) || timeOut <= 0)) {
		throw new Error('Cache timeout must be a positive number');
	}

	//<a name="put"> </a>
	self.put = function put(key, val){
		var oldRecord = cache[key];
		if(oldRecord){
			if(oldRecord.timeout){
				clearTimeout(oldRecord.timeout);
			}
			delete oldRecord;
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

		cache[key] = record;
	}

	//<a name="del"> </a>
	self.del = function del(key){
		var oldRecord = cache[key];
		if(oldRecord && oldRecord.timeout){
			clearTimeout(cache[key].timeout);
		}
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
		cache = Object.create(null);
	}
	
	//<a name="get"> </a>
	self.get = function get(){
		return cache[key];
	}

}
module.exports = Cache;
var Cache = require('./lib/caches');
var API = require('./lib/api');
var api = new API();
var process = require('process');

function failed(error){
	console.log(error);
	process.exit();
}

api.fetchLangs(function (err, langs){
	if(err){
		failed(new Error('Failed to initialize languages\n'+err))
	} else {
		langs.forEach(function(lang){
			api.fetchLang(lang.name, function(err, lang){
				if(err){
					failed(new Error('Failed to initialize languages\n'+err));
				} else {
					Cache.LangsCache.put(lang.name, lang);
				}
			})
		})
	}
});
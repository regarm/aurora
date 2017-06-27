var Cache = require('./caches');
var api = require('./api');
var Queues = require('./queues');
var async = require('./async');

module.exports = {
	LangService : {
		get : function get(lang, callback){
			var cacheLang = Cache.LangCache.get(lang);
			if(cacheLang){
				return callback(null, cacheLang);
			} else {
				api.fetchLangs(function(err){
					if(err){
						callback(err);
					} else {
						var cacheLang = Cache.LangCache.get(lang);
						callback(null, cacheLang);
					}
				})
			}
		},
		query : function query(callback){
			if(Cache.LangCache.empty()){
				api.fetchLangs(function(err){
					if(err){
						callback(err);
					} else {
						callback(null);
					}
				})
			} else {
				callback(null);
			}
		}
	},
	ProblemService : {
		get : function get(problem, callback){
			Queues.ProblemFetchQueue.enqueue(problem, function (problem, endWorker){
				async.series([
					ProblemService.fetchProblem()
				], function (err){
				})
			});
		}
	}
}
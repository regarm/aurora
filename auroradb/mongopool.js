var MongoClient = require('mongodb').MongoClient;
var conf = require('./conf.js');

var options = {poolSize: conf.maxPoolSize, autoReconnect: conf.autoReconnect};
var db = null;


exports = module.exports = {
	initPool : function initPool(cb){
		MongoClient.connect(conf.url, options, function (err, database){
			if(err){
				return cb(err);
			} else {
				db = database;
				return cb(null, db);
			}
		});
	},
	getInstance: function getInstance(cb){
		if(!db){
			return exports.initPool(cb);
		} else {
			return cb(null, db);
		}
	}
}
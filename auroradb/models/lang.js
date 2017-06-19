var MongoPool = require('../mongopool.js');
var async = require('async');
var {ObjectId} = require('mongodb');

exports = module.exports = {
	lang_get_one: function lang_get_one(name, cb){
		MongoPool.getInstance(function(err, db){
			if(err) return cb(err);
			db.collection('lang').findOne({name: name}, function (err, lang){
				if(err) return cb(err);
				return cb(null, lang);
			})
		})
	},
	lang_get_all: function lang_get_all(cb){
		MongoPool.getInstance(function(err, db){
			if(err) return cb(err);
			db.collection('lang').find({}, {name:1}).toArray(function (err, langs){
				if(err) return cb(err);
				return cb(null, langs);
			})
		})
	},
	lang_update_one: function lang_update_one(name, updateSet, cb){
		MongoPool.getInstance(function(err, db){
			if(err) return cb(err);
			db.collection('lang').updateOne({name: name}, {$set: updateSet}, function (err, document){
				if(err) return cb(err);
				return cb(null);
			})
		})
	},
	
}
var MongoPool = require('../mongopool.js');
var async = require('async');
var {ObjectId} = require('mongodb');

exports = module.exports = {
	getLang: function getLang(lang, cb){
		MongoPool.getInstance(function(err, db){
			if(err) return cb(err);
			db.collection('lang').findOne({_id: ObjectId(lang.langId)}, function (err, document){
				if(err) return cb(err);
				return cb(null, document);
			})
		})
	}
}
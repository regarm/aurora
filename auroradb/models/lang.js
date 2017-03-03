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
	},
	getLangs: function getLangs(cb){
		MongoPool.getInstance(function(err, db){
			if(err) return cb(err);
			db.collection('lang').aggregate([{$match: {}}, {$project: {_id: 0, langId: "$_id", name: 1, editor_mode: 1, syntax_mode: 1}}], function (err, document){
				if(err) return cb(err);
				return cb(null, document);
			})
		})
	},
	
}
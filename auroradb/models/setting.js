var MongoPool = require('../mongopool.js');
var async = require('async');
var {ObjectId} = require('mongodb');

exports = module.exports = {
	verdict_get_all: function verdict_get_all(cb){
		MongoPool.getInstance(function(err, db){
			if(err) return cb(err);
			db.collection('setting').findOne({"verdicts" : { "$exists" : true } }, {_id:0}, function (err, document){
				if(err) return cb(err);
				return cb(null, document.verdicts);
			})
		})
	}
}
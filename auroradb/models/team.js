var MongoPool = require('../mongopool.js');
var async = require('async');
var {ObjectId} = require('mongodb');


exports = module.exports = {
	registerTeam: function registerTeam(reg, cb){
		MongoPool.getInstance(function(err, db){
			if(err){
				return cb(err);
			} else {			
				db.collection('team').insertOne(reg, function(err, doc){
					return cb(err, doc);
				});
			}
		})
	}
}
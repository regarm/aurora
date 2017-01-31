var MongoPool = require('../mongopool.js');
var async = require('async');
var {ObjectId} = require('mongodb');

exports = module.exports = {
	submit: function submit(submission, cb){
		MongoPool.getInstance(function(err, db){
			if(err) return cb(err);
			db.collection('submission').insertOne(submission, function (err, document){
				if(err) return cb(err);
				return cb(err, document.insertedId);
			})
		})
	}
}
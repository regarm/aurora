var MongoPool = require('../mongopool.js');
var async = require('async');
var {ObjectId} = require('mongodb');

exports = module.exports = {
	fetchFile: function fetchFile(file, cb){
		MongoPool.getInstance(function(err, db){
			if(err) return cb(err);
			db.collection('io').findOne({_id: ObjectId(file.fileId)}, function (err, document){
				if(err) return cb(err);
				return cb(null, document.value);
			})
		})
	}
}
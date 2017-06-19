var MongoPool = require('../mongopool.js');
var async = require('async');
var {ObjectId} = require('mongodb');

exports = module.exports = {
	file_get_one: function file_get_one(file, cb){
		MongoPool.getInstance(function(err, db){
			if(err) return cb(err);
			db.collection('file').findOne({_id: ObjectId(file.fileId)}, function (err, document){
				if(err) return cb(err);
				return cb(null, document.value);
			})
		})
	},
	file_upload_one: function file_upload_one(file, cb){
		MongoPool.getInstance(function(err, db){
			if(err) return cb(err);
			db.collection('file').insertOne({value: file}, function (err, document){
				if(err) return cb(err);
				return cb(null, document);
			})
		})
	}
}
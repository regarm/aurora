var MongoPool = require('../mongopool.js');
var async = require('async');
var {ObjectId} = require('mongodb');

exports = module.exports = {
	fetchFile: function fetchFile(file, cb){
		MongoPool.getInstance(function(err, db){
			if(err) return cb(err);
			db.collection('io').findOne({_id: ObjectId(file.fileId)}, function (err, document){
				if(err) return cb(err);
				if(document){
					return cb(null, document.value);
				} else {
					return cb(new Error('File : ' + file.fileId + ' not found.'));
				}
			})
		})
	},
	uploadFile: function uploadFile(file, cb){
		MongoPool.getInstance(function(err, db){
			if(err) return cb(err);
			db.collection('io').insertOne({value: file}, function (err, document){
				if(err) return cb(err);
				return cb(null, document);
			})
		})
	}
}
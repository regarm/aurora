var MongoPool = require('../mongopool.js');
var async = require('async');
var {ObjectId} = require('mongodb');

exports = module.exports = {
	submission_create_one: function submission_create_one(submission, cb){
		MongoPool.getInstance(function(err, db){
			if(err) return cb(err);
			db.collection('submission').insertOne(submission, function (err, document){
				if(err) return cb(err);
				return cb(err, document.insertedId);
			})
		})
	},
	submission_get_one: function submission_get_one(submissionId, cb){
		MongoPool.getInstance(function(err, db){
			if(err) return cb(err);
			db.collection('submission').findOne({_id: ObjectId(submissionId)}, {}, function (err, submission){
				if(err) return cb(err);
				submission.submissionId = submission._id;
				submission.creationTime = submission._id.getTimestamp();
				return cb(err, submission);
			})
		})
	},
	submissions_get_all: function submissions_get_all(filter, cb){
		MongoPool.getInstance(function(err, db){
			if(err) return cb(err);
			db.collection('submission').aggregate([{$match: filter}, {$project: {_id: 0, submissionId: "$_id", contestCode: 1, problemCode: 1}}]).toArray(function (err, submissions){
				if(err) return cb(err);
				return cb(null, submissions);
			})
		})
	},
	// getSubmittedTime: function getSubmittedTime(submission, cb){
	// 	MongoPool.getInstance(function(err, db){
	// 		if(err) return cb(err);
	// 		db.collection('submission').findOne({_id: ObjectId(submission.submissionId), problemCode: submission.problemCode, contestCode: submission.contestCode}, {_id: 1}, function (err, document){
	// 			if(err) return cb(err);
	// 			return cb(err, document._id.getTimestamp());
	// 		})
	// 	})
	// },
	// getOverAllResult: function getOverAllResult(submission, cb){
	// 	MongoPool.getInstance(function(err, db){
	// 		if(err) return cb(err);
	// 		db.collection('submission').findOne({_id: ObjectId(submission.submissionId), problemCode: submission.problemCode, contestCode: submission.contestCode}, {overAllResult: 1}, function (err, document){
	// 			if(err) return cb(err);
	// 			return cb(err, document.overAllResult);
	// 		})
	// 	})
	// },
	// getLang: function getLang(submission, cb){
	// 	MongoPool.getInstance(function(err, db){
	// 		if(err) return cb(err);
	// 		db.collection('submission').findOne({_id: ObjectId(submission.submissionId), problemCode: submission.problemCode, contestCode: submission.contestCode}, {_id: 0, langId: 1}, function (err, document){
	// 			if(err) return cb(err);
	// 			return cb(err, document);
	// 		})
	// 	})
	// },
	// getHandle: function getHandle(submission, cb){
	// 	MongoPool.getInstance(function(err, db){
	// 		if(err) return cb(err);
	// 		db.collection('submission').findOne({_id: ObjectId(submission.submissionId), problemCode: submission.problemCode, contestCode: submission.contestCode}, {_id: 0, handle: 1}, function (err, document){
	// 			if(err) return cb(err);
	// 			return cb(err, document.handle);
	// 		})
	// 	})
	// },
	submissionExistance: function submissionExistance(submission, cb){
		MongoPool.getInstance(function(err, db){
			if(err) return cb(err);
			db.collection('submission').findOne({contestCode: submission.contestCode, problemCode: submission.problemCode, _id: ObjectId(submission.submissionId)}, {_id: 1}, function (err, document){
				if(err) return cb(err);
				if(document) return cb(null, true);
				else return cb(null, false);
			})
		})
	}
}
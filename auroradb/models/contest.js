var MongoPool = require('../mongopool.js');
var async = require('async');
var {ObjectId} = require('mongodb');

exports = module.exports = {
	contest_get_one: function contest_get_one(contestCode, cb){
		MongoPool.getInstance(function(err, db){
			if(err) return cb(err);
			db.collection('contest').findOne({contestCode: contestCode}, {_id:0}, function (err, document){
				if(err) return cb(err);
				return cb(null, document);
			})
		})
	},
	contest_update_one: function contest_update_one(contest, updateSet, cb){
		MongoPool.getInstance(function(err, db){
			if(err) return cb(err);
			db.collection('contest').updateOne(contest, {$set: updateSet}, function (err, document){
				if(err) return cb(err);
				return cb(null);
			})
		})
	},
	// problemsList: function problemsList(contest, cb){
	// 	MongoPool.getInstance(function(err, db){
	// 		if(err) return cb(err);
	// 		db.collection('contest').findOne({contestCode: contest.contestCode}, function (err, document){
	// 			if(err) return cb(err);
	// 			return cb(null, document.problems);
	// 		})
	// 	})
	// },
	contest_get_all: function contest_get_all(cb){
		MongoPool.getInstance(function(err, db){
			if(err) return cb(err);
			db.collection('contest').find({}, {_id: 0, contestCode: 1}).toArray(function (err, contests){
				if(err) return cb(err);
				return cb(null, contests);
			})
		})
	},
	// getContestEndTimes: function getContestEndTimes(contest, cb){
	// 	MongoPool.getInstance(function(err, db){
	// 		if(err) return cb(err);
	// 		db.collection('contest').findOne({contestCode: contest.contestCode}, {_id: 0, startTime: 1, endTime: 1}, function (err, endTimes){
	// 			if(err) return cb(err);
	// 			return cb(null, endTimes);
	// 		})
	// 	})
	// },
	contestExistance: function contestExistance(contestCode, cb){
		MongoPool.getInstance(function(err, db){
			if(err) return cb(err);
			db.collection('contest').findOne({contestCode: contestCode}, function (err, document){
				if(err) return cb(err);
				if(document) return cb(null, true);
				else return cb(null, false);
			})
		})
	}
}
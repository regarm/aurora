var MongoPool = require('../mongopool.js');
var async = require('async');
var {ObjectId} = require('mongodb');

exports = module.exports = {
	contestName: function contestName(contest, cb){
		MongoPool.getInstance(function(err, db){
			if(err) return cb(err);
			db.collection('contest').findOne({contestCode: contest.contestCode}, function (err, document){
				if(err) return cb(err);
				return cb(null, document.contestName);
			})
		})
	},
	problemsList: function problemsList(contest, cb){
		MongoPool.getInstance(function(err, db){
			if(err) return cb(err);
			db.collection('contest').findOne({contestCode: contest.contestCode}, function (err, document){
				if(err) return cb(err);
				return cb(null, document.problems);
			})
		})
	},
	contestList: function contestList(cb){
		MongoPool.getInstance(function(err, db){
			if(err) return cb(err);
			db.collection('contest').find({}, {_id: 0, contestCode: 1}).toArray(function (err, contests){
				if(err) return cb(err);
				return cb(null, contests);
			})
		})
	},
	getContestEndTimes: function getContestEndTimes(contest, cb){
		MongoPool.getInstance(function(err, db){
			if(err) return cb(err);
			db.collection('contest').findOne({contestCode: contest.contestCode}, {_id: 0, startTime: 1, endTime: 1}, function (err, endTimes){
				if(err) return cb(err);
				return cb(null, endTimes);
			})
		})
	},
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
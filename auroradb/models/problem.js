var MongoPool = require('../mongopool.js');
var async = require('async');
var {ObjectId} = require('mongodb');

exports = module.exports = {
	problem_get_one: function problem_get_one(problem, cb){
		MongoPool.getInstance(function(err, db){
			if(err) return cb(err);
			db.collection('problem').findOne({contestCode: problem.contestCode, problemCode : problem.problemCode}, {_id: 0}, function (err, problem){
				if(err) return cb(err);
				return cb(null, problem);
			})
		})
	},
	// problemStmt: function problemStmt(problem, cb){
	// 	MongoPool.getInstance(function(err, db){
	// 		if(err) return cb(err);
	// 		db.collection('problem').findOne({problemCode: problem.problemCode}, function (err, document){
	// 			if(err) return cb(err);
	// 			return cb(null, document.problemStmt);
	// 		})
	// 	})
	// },
	// problemTasks: function problemTasks(problem, cb){
	// 	MongoPool.getInstance(function(err, db){
	// 		if(err) return cb(err);
	// 		db.collection('problem').findOne({contestCode:problem.contestCode, problemCode: problem.problemCode}, {_id: 0, tasks: 1}, function (err, document){
	// 			if(err) return cb(err);
	// 			return cb(null, document.tasks);
	// 		})
	// 	})
	// },
	problemExistance: function problemExistance(problem, cb){
		MongoPool.getInstance(function(err, db){
			if(err) return cb(err);
			db.collection('problem').findOne({contestCode: problem.contestCode, problemCode: problem.problemCode}, {_id: 1}, function (err, document){
				if(err) return cb(err);
				if(document) return cb(null, true);
				else return cb(null, false);
			})
		})
	},
	problem_update_one: function problem_update_one(problem, updateSet, cb){
		MongoPool.getInstance(function(err, db){
			if(err) return cb(err);
			db.collection('problem').updateOne(problem, {$set: updateSet}, function (err, document){
				if(err) return cb(err);
				return cb(null);
			})
		})
	},
	// updateProblemTasks: function updateProblemTasks(problem, cb){
	// 	MongoPool.getInstance(function(err, db){
	// 		if(err) return cb(err);
	// 		db.collection('problem').updateOne({contestCode: problem.contestCode, problemCode: problem.problemCode},
	// 		 {$set: {tasks: problem.tasks}}, function (err, document){
	// 			if(err) return cb(err);
	// 			return cb(null);
	// 		})
	// 	})
	// }
}
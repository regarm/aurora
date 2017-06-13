//Messenger between judge and client
//
// ********
// 1. `judge` submission
//		```{type : 'judge', data : { submission : submission} }```
// 2. 'live' code and run
//		```{type : 'live', data :{source:---,input:---,lang:---}}```

var process = require('process');
var API = require('../api');
var api = new API();

var eventEmitter = new (require('events')).EventEmitter();
//messages
var messages = require('./messages')(eventEmitter);

// Restrictions on incoming messages
function Restrictions(){

	//General Restriction
	this.generalRestriction = function generalRestriction(msg, callback){
		if(msg.type && msg.data){
			callback(msg);
		} else {
			process.emitWarning('Incoming message did not satisfy general restriction, Ignoring');
		}
	}

	//Restriction on submission
	this.submissionRestriction = function submissionRestriction(submission, callback){
		if(submission && submission.submissionId && submission.problemCode && submission.contestCode){
			api.fetchSolution(submission, function (err){
				if(err) {
					callback(err);
				} else {
					callback();
				}
				
			})
		} else {
			process.emitWarning('Incoming message did not satisfy submission restriction, Ignoring');
		}
	}

	//Restriction on live code and run
	this.liveRestriction = function liveRestriction(live, callback) {
		//for now
		callback();
	}
}

var restriction = new Restrictions();

//Message Parsing
function messenger(ws, msg){
	restriction.generalRestriction(msg, function(msg){
		switch(msg.type){
			case "judge":
				restriction.submissionRestriction(msg.data.submission, function (){
					eventEmitter.emit('judge', ws, msg.data.submission);
				});
				break;
			case "live":
				restriction.liveRestriction(msg.data, function (){
					eventEmitter.emit('live', ws, msg.data);
				});
				break;
			case "rejudge":
				restriction.submissionRestriction(msg.data.submission, function (){
					eventEmitter.emit('rejudge', ws, msg.data.submission);
				});
				break;
			case "remove-from-queue":
				restriction.submissionRestriction(msg.data.submission, function (){
					eventEmitter.emit('remove-from-queue', ws, msg.data.submission);
				});
				break;
			case "is-in-queue":
				restriction.submissionRestriction(msg.data.submission, function (){
					eventEmitter.emit('is-in-queue', ws, msg.data.submission);
				});
				break;
		}
	})
}
module.exports = messenger;
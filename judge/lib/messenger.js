//Messenger between judge and client
//Supported Messages :
// 1. `judge` submission  
// 2. `rejudge` submission  
// 3. `remove-from-queue` submission  
// 4. `is-in-queue` sumission  

// i.e. {type : 'judge', data : { submission : submission} }

var process = require('process');
var api = require('./api');

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
			api.fetchSubmission(submission, function (err){
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
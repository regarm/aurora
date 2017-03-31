//Messages Implementation

//[Queue Data Structure](queue.html)
var Queue = require('./queue');

//Submission Queue
var SubmissionQueue = new Queue(require('./judge'));
var ProblemQueue = new Queue(require('./problemFetch'));

//conf
var conf = require('../conf');
conf.SubmissionQueue = SubmissionQueue;
conf.ProblemQueue = ProblemQueue;


function enqueueProblem(submission){
	var problem = {};
	problem.problemCode = submission.problemCode;
	problem.contestCode = submission.contestCode;
	problem.problemCode_contestCode = submission.contestCode + "_" + submission.problemCode;
	var keyParameter = "problemCode_contestCode";
	ProblemQueue.enqueue(problem, keyParameter);
}

function enqueueSubmission(submission){
	SubmissionQueue.enqueue(submission, 'submissionId');
}

function messages(eventEmitter){
	eventEmitter.on('judge', function(ws, submission){
		enqueueProblem(submission);
		enqueueSubmission(submission);
	});
	eventEmitter.on('rejudge', function(ws, submission){
		enqueueProblem(submission);
		enqueueSubmission(submission);
	});
	eventEmitter.on('remove-from-queue', function(ws, submission){
		SubmissionQueue.dequeue(submission, 'submissionId');
	});
	eventEmitter.on('is-in-queue', function(ws, submission){
		console.log({type : 'is-in-queue', data :{submission:submission}, result: SubmissionQueue.has(submission, 'submissionId')});
		// ws.send({type : 'is-in-queue', data :{submission:submission}, result: SubmissionQueue.has(submission, 'submissionId')});
	})
}

module.exports = messages;
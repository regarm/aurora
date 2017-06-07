//[Queue Data Structure](queue.html)
var Queue = require('./queue');
var api = require('./api');

var SubmissionQueue = new Queue(api.fetchSubmission, 'submissionId', 1);
var ProblemQueue = new Queue(require('./problemFetch'), 'contestCode_problemCode', 1);
var JudgeQueue = new Queue(/*require('./judge')*/function (){console.log('executing')}, 'submissionId', 1);

//Q.js
var Q = require('./Q');
Q.SubmissionQueue = SubmissionQueue;
Q.ProblemQueue = ProblemQueue;
Q.JudgeQueue = JudgeQueue;


function enqueueProblem(submission){
	var problem = {};
	problem.problemCode = submission.problemCode;
	problem.contestCode = submission.contestCode;
	problem.problemCode_contestCode = submission.contestCode + "_" + submission.problemCode;
	var keyParameter = "contestCode_problemCode";
	ProblemQueue.enqueue(problem, keyParameter);
}

function enqueueSubmission(submission){
	JudgeQueue.enqueue(submission, 'submissionId');
	SubmissionQueue.enqueue(submission, 'submissionId');
}

module.exports.enqueueProblem = enqueueProblem;
module.exports.enqueueSubmission = enqueueSubmission;
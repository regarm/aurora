//[Queue Data Structure](queue.html)
var Queue = require('./queue');

//Submission Queue
var SubmissionQueue = new Queue(require('./judge'), 'submissionId', 1);
var ProblemQueue = new Queue(require('./problemFetch'), 'contestCode_problemCode', 1);

//conf
var conf = require('../conf');
conf.SubmissionQueue = SubmissionQueue;
conf.ProblemQueue = ProblemQueue;


function enqueueProblem(submission){
	var problem = {};
	problem.problemCode = submission.problemCode;
	problem.contestCode = submission.contestCode;
	problem.problemCode_contestCode = submission.contestCode + "_" + submission.problemCode;
	var keyParameter = "contestCode_problemCode";
	ProblemQueue.enqueue(problem, keyParameter);
}

function enqueueSubmission(submission){
	SubmissionQueue.enqueue(submission, 'submissionId');
}

module.exports.enqueueProblem = enqueueProblem;
module.exports.enqueueSubmission = enqueueSubmission;
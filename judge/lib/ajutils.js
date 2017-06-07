var Queues = require('./queues');
var Caches = require('./caches');
var api = require('./api');

function enqueueProblem(submission){
	var problem = {};
	problem.problemCode = submission.problemCode;
	problem.contestCode = submission.contestCode;
	Queues.ProblemFetchQueue.enqueue(problem);
}

function enqueueSubmission(sub){
	// JudgeQueue.enqueue(submission);
	var submission = {};
	submission.problemCode = sub.problemCode;
	submission.contestCode = sub.contestCode;
	submission.submissionId = sub.submissionId;
	SubmissionFetchQueue.enqueue(submission);
}

module.exports.enqueueProblem = enqueueProblem;
module.exports.enqueueSubmission = enqueueSubmission;
var Queues = require('./queues');
var Caches = require('./caches');
var api = require('./api');

function enqueueProblem(submission){
	if(submission && submission.problemCode && submission.contestCode){
		var problem = {};
		problem.problemCode = submission.problemCode;
		problem.contestCode = submission.contestCode;
		Queues.ProblemFetchQueue.enqueue(problem);
	}
}

function enqueueSubmission(submission){
	JudgeQueue.enqueue(submission);
	var submission = {};
	submission.problemCode = submission.problemCode;
	submission.contestCode = submission.contestCode;
	submission.submissionId = submission.submissionId;
	SubmissionFetchQueue.enqueue(submission);
}

module.exports.enqueueProblem = enqueueProblem;
module.exports.enqueueSubmission = enqueueSubmission;
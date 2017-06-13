//Messages Implementation

var ajutils = require('../ajutils');
var live = require('../live');

function messages(eventEmitter){
	eventEmitter.on('judge', function(ws, submission){
		ajutils.enqueueProblem(submission);
		ajutils.enqueueSubmission(submission);
	});
	eventEmitter.on('live', function(ws, liveData){
		live.run(ws, liveData);
	})
	eventEmitter.on('rejudge', function(ws, submission){
		ajutils.enqueueProblem(submission);
		ajutils.enqueueSubmission(submission);
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
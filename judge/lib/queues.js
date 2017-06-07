//Queues for their purposes

var Queue = require('./dataType/queue');
var Cache = require('./caches')
var api = require('./api');
var API = new api();


/* Queue of submissions to fetch them */
SubmissionFetchQueue = new Queue(API.fetchSolution, 1);

/* Queue of problems to fetch problem tasks */
ProblemFetchQueue = new Queue(function ProblemFetchQueue_task(item, cb){
	API.fetchProblemTasks(item, function (err, tasks){
		var problem = {
			problemCode: item.problemCode,
			contestCode: item.contestCode,
			tasks: tasks
		}
		Cache.ProblemTasksCache.put(problem.contestCode + "_" + problem.problemCode, problem);
		cb();
	});
}, 1);

/* Queue of submissions to judge them */
JudgeQueue = new Queue(require('./judge'), 1);


module.exports.SubmissionFetchQueue = SubmissionFetchQueue;
module.exports.ProblemFetchQueue = ProblemFetchQueue;
module.exports.JudgeQueue = JudgeQueue;
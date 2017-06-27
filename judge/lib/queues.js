//Queues for their purposes

var Queue = require('./dataType/queue');


/* Queue of submissions to fetch them */
// SubmissionFetchQueue = new Queue(api.fetchSolution, 1);

/* Queue of problems to fetch problem tasks (Only to be used by services.js)*/
ProblemFetchQueue = new Queue(1);

/* Queue of submissions to judge them */
// JudgeQueue = new Queue(require('./stages/judge'), 1);


// module.exports.SubmissionFetchQueue = SubmissionFetchQueue;
module.exports.ProblemFetchQueue = ProblemFetchQueue;
// module.exports.JudgeQueue = JudgeQueue;
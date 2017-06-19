//Caches for their purposes

var cache = require('./dataType/cache');
var api = require('./api');


/* Queue of submissions to fetch them */
SubmissionStatusCache = new cache(10000);

/* Queue of problems to fetch problem tasks */
ProblemTasksCache = new cache(10000);

/* Cache for languages */
LangsCache = new cache();

module.exports.SubmissionStatusCache = SubmissionStatusCache;
module.exports.ProblemTasksCache = ProblemTasksCache;
module.exports.LangsCache = LangsCache;
//Caches for their purposes

var cache = require('./dataType/cache');


/* Queue of submissions to fetch them */
SubmissionCache = new cache(10000);

/* Cache for languages (Only to be directly used by api.js and services.js)*/
LangCache = new cache();

/* Cache for languages (Only to be used directly by api.js and services.js)*/
ProblemCache = new cache(60000);

module.exports.SubmissionCache = SubmissionCache;
module.exports.LangCache = LangCache;
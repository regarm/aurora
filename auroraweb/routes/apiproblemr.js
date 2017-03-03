/**
'/api/:contestCode/:problemCode' routes are here
*/
var express = require('express');
var router = express.Router({mergeParams: true});
var api = require('../app_server/controllers/api');
var middle = require('../app_server/middleware/index');

router.use(middle.problemShouldExist);
router.post('/getProblemName', api.getProblemName);
router.post('/getProblemStmt', api.getProblemStmt);
router.post('/getProblemTasks', api.getProblemTasks);
router.post('/getSubmissionsList', api.getSubmissionsList);
router.post('/submit', api.submit);
router.post('/updateProblemStmt', api.updateProblemStmt);
router.post('/updateProblemTasks', api.updateProblemTasks);

router.use('/:submissionId', require('./apisubmissionr.js'));

router.use(function(err, req, res, next) {
	//bypassed
	if((!err) || (err && err.status === 404)){
		err = null;
		next();
	} else{
		next(err);
	}
});
module.exports = router;
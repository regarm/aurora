/**
'/api/:contestCode/:problemCode' routes are here
*/
var express = require('express');
var router = express.Router({mergeParams: true});
var api = require('../app_server/controllers/api');
var middle = require('../app_server/middleware/index');


router.use('/:problemCode', middle.problemShouldExist);
router.get('/:problemCode', api.problem_get_one);
router.put('/:problemCode', api.problem_update_one);

// router.post('/getProblemName', api.getProblemName);
// router.post('/getProblemStmt', api.getProblemStmt);
// router.post('/getProblemTasks', api.getProblemTasks);
// router.post('/getSubmissionsList', api.getSubmissionsList);
// router.post('/submit', api.submit);
// router.post('/updateProblemStmt', api.updateProblemStmt);
// router.post('/updateProblemTasks', api.updateProblemTasks);

router.get('/:problemCode/file/:fileId', api.file_get_one);
router.post('/:problemCode/file', api.file_upload_one);

router.use('/:problemCode/submission', require('./api.contest.problem.submission.js'));
module.exports = router;
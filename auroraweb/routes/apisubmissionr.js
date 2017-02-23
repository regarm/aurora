/**
'/api/:contestCode/:problemCode/:submissionId' routes are here
*/
var express = require('express');
var router = express.Router({mergeParams: true});
var api = require('../app_server/controllers/api');
var middle = require('../app_server/middleware/index');

router.use(middle.submissionShouldExist);
router.post('/getSolution', api.getSolution);
router.post('/getSubmissionSubmittedTime', api.getSubmissionSubmittedTime);
router.post('/getSubmissionOverAllResult', api.getSubmissionOverAllResult);
router.post('/getSubmissionLang', api.getSubmissionLang);
router.post('/getSubmissionHandle', api.getSubmissionHandle);

router.use(function(err, req, res, next) {
	//bypassed
	console.log(err);
	if((!err) || (err && err.status === 404)){
		err = null;
		next();
	} else{
		next(err);
	}
});

module.exports = router;
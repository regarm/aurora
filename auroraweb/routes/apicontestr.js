/**
'/api/:contestCode' routes are here
*/
var express = require('express');
var router = express.Router({mergeParams: true});
var api = require('../app_server/controllers/api');
var middle = require('../app_server/middleware/index');


router.use(middle.contestShouldExist);
router.post('/contestExistance', api.contestExistance);
router.post('/getContestEndTimes', api.getContestEndTimes);
router.post('/getContestName', api.getContestName);
router.post('/getContestProblemsList', api.getContestProblemsList);

router.use('/:problemCode', require('./apiproblemr.js'));

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
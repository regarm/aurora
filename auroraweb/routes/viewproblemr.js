/**
'/:problemCode' routes are here
*/
var express = require('express');
var router = express.Router({mergeParams: true});
var view = require('../app_server/controllers/view');
var middle = require('../app_server/middleware/index');


router.use(middle.problemShouldExist);
router.get('/', view.problem);
router.get('/:submissionId', view.submission);

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
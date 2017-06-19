/**
'/api/:contestCode' routes are here
*/
var express = require('express');
var router = express.Router({mergeParams: true});
var api = require('../app_server/controllers/api');
var middle = require('../app_server/middleware/index');


router.get('/', api.contest_get_all);
router.get('/:contestCode', api.contest_get_one);
router.put('/:contestCode', api.contest_update_one);

// router.delete('/', api.contest_delete);
// router.post('/', api.contest_post);
// router.post('/', api.contest_put);

router.use('/:contestCode', middle.contestShouldExist);
router.use('/:contestCode/problem', require('./api.contest.problem.js'));

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
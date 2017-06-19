/**
'/:contestCode' routes are here
*/
var express = require('express');
var router = express.Router({mergeParams: true});
var view = require('../app_server/controllers/view');
var middle = require('../app_server/middleware/index');


router.get('/', view.contest);
router.get('/edit', view.contestEdit);

router.use('/problem/:problemCode', middle.problemShouldExist);
router.use('/problem/:problemCode', require('./view.contest.problem'));

module.exports = router;
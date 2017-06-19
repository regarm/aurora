/**
'/:problemCode' routes are here
*/
var express = require('express');
var router = express.Router({mergeParams: true});
var view = require('../app_server/controllers/view');
var middle = require('../app_server/middleware/index');



router.get('/', view.problem);


router.get('/submission/:submissionId', middle.submissionShouldExist);
router.get('/submission/:submissionId', view.submission);

module.exports = router;
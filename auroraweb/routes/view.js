/**
'/' routes are here
*/
var express = require('express');
var router = express.Router();
var view = require('../app_server/controllers/view');
var middle = require('../app_server/middleware/index');

router.get('/', view.home);
router.get('/login', view.login);
router.get('/contests', view.contest_all);
router.get('/submissions', view.submissionsList);
router.get('/exit_codes', view.verdicts);
router.get('/run', view.run);
router.get('/setting', view.setting);


router.use('/contest/:contestCode', middle.contestShouldExist);
router.use('/contest/:contestCode', require('./view.contest'));
module.exports = router;
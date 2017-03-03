/**
/api 
*/
var express = require('express');
var router = express.Router();
var api = require('../app_server/controllers/api');

router.post('/handleExistance', api.handleExistance);
router.post('/login', api.login);
router.post('/getSession', api.getSession);
router.post('/logout', api.logout);
router.post('/getContestList', api.getContestList);
router.post('/getSubmissionsList', api.getSubmissionsList);
router.post('/getLang/:langId', api.getLang);
router.post('/fetchFile/:fileId', api.fetchFile);
router.post('/getLangs', api.getLangs);
router.post('/fileUpload', api.fileUpload);


router.use('/:contestCode', require('./apicontestr.js'));

router.use('/', api.n404);

module.exports = router;
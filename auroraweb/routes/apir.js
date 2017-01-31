var express = require('express');
var router = express.Router();
var api = require('../app_server/controllers/api');

router.post('/handleExistance', api.handleExistance);
router.post('/login', api.login);
router.post('/getSession', api.getSession);
router.post('/logout', api.logout);
router.post('/getContestList', api.getContestList);

router.post('/:contestCode/contestExistance', api.contestExistance);
router.post('/:contestCode/getContestEndTimes', api.getContestEndTimes);
router.post('/:contestCode/getContestName', api.getContestName);
router.post('/:contestCode/getContestProblemsList', api.getContestProblemsList);
router.post('/:contestCode/:problemCode/getProblemName', api.getProblemName);
router.post('/:contestCode/:problemCode/getProblemStmt', api.getProblemStmt);
router.post('/:contestCode/:problemCode/getProblemScores', api.getProblemScores);
router.post('/:contestCode/:problemCode/submit', api.submit);

router.use('/', api.n404);
module.exports = router;
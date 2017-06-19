/**
/api 
*/
var express = require('express');
var router = express.Router();
var api = require('../app_server/controllers/api');

router.post('/session', api.session_new);
router.get('/session', api.session_get);
router.delete('/session', api.session_delete);

router.get('/lang', api.lang_get_all);
router.get('/lang/:name', api.lang_get_one);
router.put('/lang/:name', api.lang_update_one);

router.get('/verdict', api.verdict_get_all);
router.get('/counter', api.counter_get_one);

// router.post('/handleExistance', api.handleExistance);
// router.post('/getSubmissionsList', api.getSubmissionsList);
// router.post('/getLang/:langId', api.getLang);
// router.post('/getLangs', api.getLangs);


router.use('/contest', require('./api.contest'));

router.use('/', api.n404);

module.exports = router;
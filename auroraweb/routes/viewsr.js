/**
'/' routes are here
*/
var express = require('express');
var router = express.Router();
var view = require('../app_server/controllers/view');
var middle = require('../app_server/middleware/index');

router.get('/', view.home);
router.get('/login', view.login);
router.get('/contests', view.contestList);

router.use('/:contestCode', require('./viewcontestr'));
module.exports = router;
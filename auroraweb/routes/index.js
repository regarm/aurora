/**
'/' routes are here
*/

exports = module.exports = function (app){
	app.use('/api', require('./api'));
	app.use('/', require('./view'));
}
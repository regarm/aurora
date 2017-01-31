/**
'/' routes are here
*/

exports = module.exports = function (app){
	app.use('/api', require('./apir'));
	app.use('/', require('./viewsr'));
}
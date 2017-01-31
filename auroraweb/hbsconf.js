var hbs = require('express-hbs');
var path = require('path');
exports = module.exports = function (app){
	// hbs.create({defaultLayout: __dirname + '/app_server/views/layouts/layout'});
	// hbs.registerPartials(path.join(__dirname, 'app_server/views/partials'));
	app.set('view engine', 'hbs');
	app.set('view cache', false);
	app.engine('hbs', hbs.express4({
	  partialsDir: __dirname + '/app_server/views/partials',
	  layoutsDir : __dirname + '/app_server/views/layouts',
	  defaultLayout: __dirname + '/app_server/views/layouts/default.hbs'
	}));
	app.set('views', path.join(__dirname, '/app_server/views'));
}
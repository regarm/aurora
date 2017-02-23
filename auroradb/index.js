var conf = require('./conf.js');

exports = module.exports = {
	user: require('./models/user'),
	team: require('./models/team'),
	problem: require('./models/problem'),
	contest: require('./models/contest'),
	submission: require('./models/submission'),
	lang: require('./models/lang'),
	io: require('./models/io'),
	conf: conf
}
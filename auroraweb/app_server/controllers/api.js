exports = module.exports = {
	handleExistance: require('./apic/handleExistance'),
	login: require('./apic/login'),
	getProblemName: require('./apic/getProblemName'),
	getContestName: require('./apic/getContestName'),
	getProblemStmt: require('./apic/getProblemStmt'),
	getSession: require('./apic/getSession'),
	logout: require('./apic/logout'),
	submit: require('./apic/submit'),
	getContestProblemsList: require('./apic/getContestProblemsList'),
	n404: require('./apic/n404'),
	getProblemScores: require('./apic/getProblemScores'),
	getContestList: require('./apic/getContestList'),
	getContestEndTimes: require('./apic/getContestEndTimes'),
	contestExistance: require('./apic/contestExistance')
}
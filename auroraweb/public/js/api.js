aojApp.requires.push('ngResource');

aojApp.factory('SessionService', function($resource){
	return $resource('/api/session');
})

aojApp.factory('ContestService', function($resource){
	return $resource('/api/contest/:contestCode', {contestCode: "@contestCode"},{
		'save': {method: 'POST'},
		'get':    {method:'GET'},
		'update' : {method: 'PUT'},
		'delete': {method:'DELETE'},
		'query':  {method:'GET', isArray:true},
	})
})

aojApp.factory('ProblemService', function($resource){
	return $resource('/api/contest/:contestCode/problem/:problemCode', {contestCode: "@contestCode", problemCode: "@problemCode"}, {
		'save': {method: 'POST'},
		'get':    {method:'GET'},
		'update' : {method: 'PUT'},
		'delete': {method:'DELETE'},
		'query':  {method:'GET', isArray:true},	
	});
})

aojApp.factory('SubmissionService', function($resource){
	return $resource('/api/contest/:contestCode/problem/:problemCode/submission/:submissionId/', {contestCode: "@contestCode", problemCode: "@problemCode", submissionId: "@submissionId"}, {
		'save': {method: 'POST'},
		'get':    {method:'GET'},
		'update' : {method: 'PUT'},
		'delete': {method:'DELETE'},
		'query':  {method:'GET', isArray:true},
	});
})

aojApp.factory('LangService', function($resource){
	return $resource('/api/lang/:name', {name:"@_id"}, {
		'save': {method: 'POST'},
		'get':    {method:'GET'},
		'update' : {method: 'PUT'},
		'delete': {method:'DELETE'},
		'query':  {method:'GET', isArray:true},
	});
})


aojApp.factory('VerdictService', function($resource){
	return $resource('/api/verdict/:exitCode', {exitCode:"@exitCode"}, {
		'save': {method: 'POST'},
		'get':    {method:'GET'},
		'update' : {method: 'PUT'},
		'delete': {method:'DELETE'},
		'query':  {method:'GET', isArray:true},
	});
})
aojApp.factory('CounterService', function($resource){
	return $resource('/api/counter', {}, {
		// 'save': {method: 'POST'},
		'get':    {method:'GET'},
		// 'update' : {method: 'PUT'},
		// 'delete': {method:'DELETE'},
		// 'query':  {method:'GET', isArray:true},
	});
})
var fs = require('fs');
var path = require('path');
var conf = require('../conf');
const { sep } = path;
var liveRoot = path.join(conf.runtime_dir, 'live');
var services = require('./services');
var compile = require('./stages/compile');
var execute = require('./stages/execute');
function createSpace(cb){
	fs.mkdtemp(`${liveRoot}${sep}`, cb);
}

function send(ws, type, data){
	ws.send(JSON.stringify({type: type, data: data}));
	// console.log({type: type, data: data});
}
function run(ws, data){
	services.LangService.get(data.lang, function (err, lang){
		if(err){
			send(ws, 'conclude', 'failed'); return ;
		}
		createSpace(function(err, space){
			if(err){
				send(ws, 'conclude', 'failed'); return ;
			}

			var interpreter = '';
			var sourceTarget = path.join(space, 'source.' + lang.source_ext);
			var exeTarget = '';
			if(lang.compile_template){
				if(data.lang === 'JAVA'){
					exeTarget = 'Main';
				} else {
					exeTarget = path.join(space, 'source.exe');
				}
			} else {
				exeTarget = sourceTarget;
			}
			var inputTarget = path.join(space, 'input');
			var outputTarget = path.join(space, 'output');
			var errorTarget = path.join(space, 'error');
			var timeLimit = 3;
			fs.writeFile(inputTarget, data.input, function (err){
				if(err) {
					send(ws, 'conclude', 'failed');return ;
				}
				fs.writeFile(sourceTarget, data.source, function (err){
					if(err) {
						send(ws, 'conclude', 'failed');return ;
					}
					send(ws, 'status', 'compiling');
					compile(lang, space, sourceTarget, exeTarget, function (compile_log){
						if(compile_log.VERDICT){
							send(ws, 'conclude', 'success');
							send(ws, 'result', compile_log);
						} else {
							send(ws, 'status', 'running');
							execute(lang, space, exeTarget, inputTarget, outputTarget, errorTarget, 3, 131072, 16384, function (execute_log){
							  	fs.readFile(errorTarget, 'utf8', function(err, error){
							  		if(err){
							  			send(ws, 'conclude', 'failed'); return;
							  		}
									else {
										execute_log.DEBUG = error.split(conf.runtime_dir).join('');
										if(execute_log.VERDICT){
											send(ws, 'conclude', 'success');
											send(ws, 'result', execute_log);
										} else {
											fs.readFile(outputTarget, 'utf8', function(err, output){
											  if(err) {
											  	send(ws, 'conclude', 'failed');return ;
											  } else {
											  	execute_log.output = output;
											  	send(ws, 'conclude', 'success');
												send(ws, 'result', execute_log);
											  }
											})
										}
									}
								})
							})
						}
					})
				})
			})
		})
	});
}
module.exports.run = run;
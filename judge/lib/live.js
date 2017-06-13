var fs = require('fs');
var path = require('path');
var conf = require('../conf');
const { sep } = path;
var liveRoot = path.join(conf.runtime_dir, 'live');
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
	createSpace(function(err, space){
		if(err){
			send(ws, 'conclude', 'failed'); return ;
		}
		console.log(space);
		var interpreter = '';
		var sourceTarget = path.join(space, 'source.cpp');
		var exeTarget = path.join(space, 'source.exe');
		var inputTarget = path.join(space, 'input');
		var outputTarget = path.join(space, 'output');
		var errorTarget = path.join(space, 'error');
		var timeLimit = 3;
		fs.writeFile(inputTarget, data.input, function (err){
			if(err) {
				send(ws, 'conclude', 'failed');ws.close();return ;
			}
			fs.writeFile(sourceTarget, data.source, function (err){
				if(err) {
					send(ws, 'conclude', 'failed');ws.close();return ;
				}
				send(ws, 'status', 'compiling');
				compile("g++", sourceTarget, exeTarget, function (compile_log){
					if(compile_log.VERDICT){
						send(ws, 'conclude', 'success');
						send(ws, 'result', compile_log);
						ws.close();
					} else {
						execute(interpreter, exeTarget, inputTarget, outputTarget, errorTarget, 3, function (execute_log){
							if(execute_log.VERDICT){
								send(ws, 'conclude', 'success');
								send(ws, 'result', execute_log);
								ws.close();
							} else {
								fs.readFile(outputTarget, 'utf8', function(err, output){
								  if(err) {
								  	send(ws, 'conclude', 'failed');ws.close();return ;
								  } else {
								  	execute_log.output = output;
								  	send(ws, 'conclude', 'success');
									send(ws, 'result', execute_log);
									ws.close();
								  }
								});
							}
						})
					}
				})
			})
		})
	})
}

module.exports.run = run;
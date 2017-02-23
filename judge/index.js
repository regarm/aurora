var WS = require('ws');
var https = require('https');
var fs = require('fs');
var judge = require('./judge');

var wss = new WS.Server({
  perMessageDeflate: false,
  port: 4091
});


wss.on('connection', function connection(ws){
	/*
	Emitted when the handshake is complete. socket is an instance of WebSocket.
	*/
	ws.on('message', function incoming(message){
		msg = JSON.parse(message);
		if(msg.type === 'judge'){
			ws.emit('judge', message);
		}
	})
	ws.on('judge', function incoming(message){
		var msg = JSON.parse(message);
		judge.run(msg.submission);
	})
});
wss.on('error', function error(err){
	console.log('Following error occured: ');
	console.log(err);
})
wss.on('headers', function (headers){
	/*
		Emitted before the response headers are written to the socket as part of the handshake.
		 This allows you to inspect/modify the headers before they are sent.
	*/
	// console.log('Headers are here : ', headers);
})
wss.on('listening', function (){
	/* Emitted when the underlying server has been bound.*/
	// console.log(wss);
	console.log("Judge is listening\n");
})
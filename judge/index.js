var WS    = require('ws');
var messenger = require('./lib/messenger');

//Creating New Websocket Server
var wss = new WS.Server({
  perMessageDeflate: false,
  port: 4091
});


//Event emitted on a new Connection
wss.on('connection', function connection(ws){

	//Event emitted on new incoming message
	ws.on('message', function incoming(message){
		msg = JSON.parse(message);
		messenger.process(ws, msg);
	})

});

//Event emitted on error occurence.
wss.on('error', function error(err){
	console.log('Following error occured: ');
	console.log(err);
})


//Emitted before the response headers are written to the socket as part of the handshake.
wss.on('headers', function (headers){
})

// Emitted when the underlying server has been bound.
wss.on('listening', function (){
	console.log("Judge is listening\n");
})
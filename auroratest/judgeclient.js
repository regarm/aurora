const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:4091', {
  perMessageDeflate: false
});
ws.on('open', function open() {
	var submission = {
		contestCode: "PRACTICE",
		problemCode: "SQ",
		submissionId: "589d935fb6f2f81ca0789e70"

	};
	var data = {type: "judge", data: {submission: submission}};
	ws.send(JSON.stringify(data));
});

ws.on('message', function incoming(data, flags) {
	console.log(data);
});
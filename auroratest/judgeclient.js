const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:4091', {
  perMessageDeflate: false
});
ws.on('open', function open() {
	var submission = {
		contestCode: "PRACTICE",
		problemCode: "TEST",
		submissionId: "5938fe308fbe910a01c9bdce"

	};
	var data = {type: "judge", data: {submission: submission}};
	ws.send(JSON.stringify(data));
	ws.close();
});

// ws.on('message', function incoming(data, flags) {
// 	console.log(data);
// });
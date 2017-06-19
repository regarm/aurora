const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:4091', {
  perMessageDeflate: false
});
var liveGo = {
	source: '#include <bits/stdc++.h> \n using namespace std; \n int main(){\n 	int N; cin >> N;\n 	for(int i = 0;i < N;++i){\n 		int x; cin >> x;\n 		cout << x * x << " ";\n 	}\n 	return 0;\n }',
	input: '10 1 2 3 4 5 6 7 8 9 10',
	lang: ''
}
var liveCE = {
	source: '#include <bits/stdc++.h> \n using namespace std; \n int main(){ int x = max(5LL, 5); }',
	input: 'dsjfl',
	lang: ''
}
var liveTLE = {
	source: '#include <bits/stdc++.h> \n using namespace std; \n int main(){\n 	int x = 1e9;\n 	while(x--);\n 	cout << x;\n 	return 0;\n }',
	input: 'dsjfl',
	lang: ''
}
var liveSIGSEGV = {
	source: '#include <bits/stdc++.h> \n using namespace std; \n int main(){\n 	int x[10];\n 	cout << x[1000000];\n 	return 0;\n }',
	input: 'dsjfl',
	lang: ''
}
var liveSIGXFSZ = {
	source: '#include <bits/stdc++.h> \n using namespace std;  \n int main(){ \n 	for(int i = 0; i < 10000000;++i){ \n 		cout << i << i << i << i << i; \n 	} \n 	return 0; \n }',
	input: 'dsjfl',
	lang: ''
}
var liveSIGFPE = {
	source: '#include <bits/stdc++.h> \n using namespace std;  \n int main(){ \n 	int x = 0; \n 	int y = 5 / y; \n 	return 0; \n }',
	input: 'dsjfl',
	lang: ''
}
ws.on('open', function open() {
	var data = {type: "live", data: liveGo};
	ws.send(JSON.stringify(data));
});

ws.on('message', function incoming(x) {
 	console.log(x);
});
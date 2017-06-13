process.on('message', function(msg){
	console.log(msg);
    if(msg === 'get_mem_usage'){
         process.send({memUsage: process.memoryUsage()});
    }
});
var psGrep = require('ps-grep');

console.log(psGrep)

psGrep.findPid('ttys00',function(error,data){
	console.log(error,data);
})
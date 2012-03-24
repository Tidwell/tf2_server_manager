var psGrep = require('./ps-grep');

console.log(psGrep)

psGrep.findPid('srcds',function(error,data){
	console.log(error,data);
})
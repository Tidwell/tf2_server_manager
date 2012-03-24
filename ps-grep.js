var exec = require('child_process').exec;

/*Accepts a string, returns an array of process ids matching that string*/
var findPid = function(str,cb) {
	var child;
	// executes `pwd`
	child = exec("ps -A | grep "+str, function (error, stdout, stderr) {
		console.log('ps '+stdout)
	  var data = [];
	  var rows = stdout.split('\n');
	  rows.forEach(function(row) {
	  	var pid = Number(row.split(str)[0].replace(/ /g,''));
	  	if (pid) {
		  	data.push(pid);
		}
	  })
	  cb(error,data);
	});

}

module.exports = {
	findPid: findPid
}
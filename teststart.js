var exec = require('child_process').exec;
var serverPath = '~/hlds/';
var cmd = 'cd '+serverPath+'gameserver/orangebox/; ./srcds_run -game tf -autoupdate -maxplayers 24 +map cp_badlands;'
console.log('cmd',cmd)
exec(cmd,function (error, stdout, stderr) {	  
	console.log('restarting server');
	if (error) {
		handleError(error,stdout,stderr);
		return;
	}
	console.log('done');
	console.log('Server Restarted');
});

var handleError = function(error,stdout,stderr) {
	console.log(error,stdout,stderr);
}
var serverPath = '~hlds/';
var cmd = 'cd '+serverPath+'gameserver/orangebox/; ./srcds_run -game tf -autoupdate -maxplayers 24 +map cp_badlands;'
console.log('cmd',cmd)
exec(cmd,function (error, stdout, stderr) {	  
	console.log('restarting server');
	if (error) {
		handleError(res, error);
		return;
	}
	console.log('done');
	console.log('Server Restarted');
});
/*App for controlling tf2 server*/

var serverPath = '~/hlds/';
var username = 'test';
var password = 'test';

var httpdigest = require('http-digest');
var psGrep = require('./ps-grep');
var exec = require('child_process').exec;

/* A simple secured web server, unauthenticated requests are not allowed */
httpdigest.createServer(username, password, function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});		
  res.write('Updating Server. \n')
  runUpdate(function(error,stdout) {
  	if (error) {
  		handleError(res, error);
  	}
  	else {
  		res.write(stdout);
  		restartServer(res);
  	}
  })
}).listen(8000);


var handleError = function(res, error) {
  console.log(error);
  res.end('error');
}

//run exec to update server, piping stdout to the http response
var runUpdate = function(cb) {
	var child;

	// executes `pwd`
	child = exec("cd "+serverPath+"; ./steam -command update -game tf -dir gameserver;", function (error, stdout, stderr) {	  
	  cb(error,stdout)
	});
}

var restartServer = function(res) {
    psGrep.findPid('srcds',function(error,pids){
    	if (error) {
    		handleError(res, error);
    		return;
    	}
    	var pidCount = 0;
		pids.forEach(function(pid) {
			console.log('killing pid '+pid)
			exec('kill '+pid,function(error,stdout,stderr){
				if (error) {
					handleError(res, error);
					return;
				}
				pidCount++;
				checkAllKillDone();
			});
		})
		var checkAllKillDone = function() {
			console.log('killed '+pidCount+' out of '+pids.length);
			if (pidCount == pids.length) {
				res.write('Server Processes Killed \n');
				exec('cd '+serverPath+'gameserver/orangebox/; ./srcds_run -game tf -autoupdate -maxplayers 24 +map cp_badlands',function (error, stdout, stderr) {	  
					console.log('restarting server');
	  				if (error) {
	  					handleError(res, error);
	  					return;
	  				}
	  				res.end('Server Restarted');
				});
			}
		}
	})
    res.end();

}
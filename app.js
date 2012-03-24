/*App for controlling tf2 server*/

var serverPath = '~/hlds/';
var username = 'test';
var password = 'test';

var httpdigest = require('http-digest');

/* A simple secured web server, unauthenticated requests are not allowed */
httpdigest.createServer(username, password, function(req, res) {
  runUpdate(function(error,stdout) {
  	res.writeHead(200, {'Content-Type': 'text/plain'});	
  	res.write('Updating Server. \n')
    if (error) {
    	res.end(error);
    	return;
    }
    res.end(stdout);
  })
}).listen(8000);




//run exec to update server, piping stdout to the http response
var runUpdate = function(cb) {
	var exec = require('child_process').exec;
	var child;

	// executes `pwd`
	child = exec("cd "+serverPath+"; ./steam -command update -game tf -dir gameserver;", function (error, stdout, stderr) {
	  cb(error,stdout)
	});
}
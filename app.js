/*App for controlling tf2 server*/

var serverPath = '~/hlds/';

//accept request over http
var http = require('http');
http.createServer(function (req, res) {
  
  runUpdate(function(error,stdout) {
  	res.writeHead(200, {'Content-Type': 'text/plain'});	
    res.end(stdout);
  })

}).listen(8000);
console.log('Server running at http://127.0.0.1:8000/');


//blow out qs

//if pw matches

//run exec to update server, piping stdout to the http response
var runUpdate = function(cb) {
	var sys = require('sys')
	var exec = require('child_process').exec;
	var child;

	// executes `pwd`
	child = exec("cd "+serverPath+"; ./steam -command update -game tf -dir gameserver;", function (error, stdout, stderr) {
	  sys.print('stdout: ' + stdout);
	  sys.print('stderr: ' + stderr);
	  cb(error,stdout)
	});
}
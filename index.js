/* jslint strict: true, node: true */
var execFile = require('child_process').execFile;

var e = exports;

e.head = function(url, branch, callback) {
  if(callback === undefined && branch !== undefined) {
    callback = branch;
    branch = undefined;
  }

  // default to branch 'master'
  if(branch === undefined) {
    branch = 'master';
  }

  execFile('git', ['ls-remote', url], function(err, stdout, stderr) {
    if(err !== null) {
      return callback(err);
    }

    var lines = stdout.split('\n');
    for(var i = 0; i < lines.length; i++) {
      var line = lines[i].split('\t');
      if(line[1] === 'refs/heads/' + branch) {
        callback(null, line[0]);
      }
    }
  });

  return true;
};

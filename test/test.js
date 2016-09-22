/* jslint strict: true, node: true */
var assert = require('assert'),
    should = require('should'),
    git    = require('../index.js');

describe('git ls-remote', function() {
  describe('head', function() {
    it('should return the most recent SHA for this repository', function(done) {
      git.head('https://github.com/benlemasurier/git-ls-remote.git', function(err, result) {
        if(err) return done(err);

        result.should.have.length(40);
        done();
      });
    });
  });
});

describe('shell command injection', function() {
  describe('head', function() {
    it('should err', function(done) {
      git.head('https://github.com/benlemasurier/git-ls-remote.git > /dev/null; echo injected command', function(err, result) {
        console.log(result);
        if (err) return done();
      });
    });
  });
});

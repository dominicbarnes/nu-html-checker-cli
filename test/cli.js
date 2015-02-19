var assert = require('assert');
var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');

var fixture = path.resolve.bind(path, __dirname, 'fixtures');
var read = fs.readFileSync;

describe('nu-html-checker', function () {
  fs.readdirSync(fixture()).forEach(function (name) {
    describe(name, function () {
      var o = { cwd: fixture(name) };

      it('should generate the right stylish text', function (done) {
        exec('../../../bin/cli input.html', o, function (err, stdout) {
          if (err) return done(err);
          var expected = read(fixture(name, 'stylish.txt'), 'utf8');
          assert.equal(stdout.trim(), expected.trim());
          done();
        });
      });

      it('should generate the right JSON', function (done) {
        exec('../../../bin/cli -f json input.html', o, function (err, stdout, stderr) {
          if (err) return done(err);
          var expected = read(fixture(name, 'expected.json'), 'utf8');
          assert.equal(stdout.trim(), expected.trim());
          done();
        });
      });
    });
  });
});

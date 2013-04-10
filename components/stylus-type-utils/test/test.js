/*global describe,it*/
'use strict';

// Stolen from https://github.com/visionmedia/nib/blob/master/test/runner.js
var fs    = require('fs'),
stylus    = require('stylus'),
typeUtils = require('../'),
assert    = require('assert');

var cases = fs.readdirSync('test/cases').filter(function (file) {
  return ~file.indexOf('.styl');
}).map(function (file) {
  return file.replace('.styl', '');
});

describe('integration', function () {
  cases.forEach(function (test) {
    var name = test.replace(/[\-\.]/g, ' ');
    it(name, function () {
      var path = 'test/cases/' + test + '.styl',
          styl = fs.readFileSync(path, 'utf8').replace(/\r/g, ''),
          css  = fs.readFileSync('test/cases/' + test + '.css', 'utf8').replace(/\r/g, '').trim();

      var style = stylus(styl)
        .use(typeUtils())
        .import('type-utils')
        .set('filename', path)
        .define('url', stylus.url());

      if (~test.indexOf('compress')) { style.set('compress', true); }

      style.render(function (err, actual) {
        if (err) { throw err; }
        assert.equal(actual.trim(), css);
      });
    });
  });
});

var Promise = require('q').Promise;

var doSomethingAsync = function(msg) {
  return new Promise(function(resolve, reject) {
    console.log(msg + ' begin');
    setTimeout(function() {
      console.log(msg + ' end');
      resolve(msg + ' result');
    }, 100);
  });
};

var done = function(result) {
  console.log('done:');
  console.log(result);
};

var msgs = ['abc', 'def', 'ghi'];

var mapSeriesNG = function(arr, f) {
  return arr.reduce(function(promise, item) {
    return promise.then(function() { return f(item); });
  }, new Promise(function(resolve) { resolve(); }))
};
// mapSeriesNG(msgs, doSomethingAsync).then(done);
// result:
// 
// abc begin
// abc end
// def begin
// def end
// ghi begin
// ghi end
// done:
// ghi result

var mapSeries = function(arr, f) {
  var results = [];
  return arr.reduce(function(promise, item) {
    return promise.then(function() {
      return f(item);
    }).then(function(result) {
      results.push(result);
    });
  }, new Promise(function(resolve) { resolve(); }))
  .then(function() { return results; });
};
mapSeries(msgs, doSomethingAsync).then(done);
// result:
// 
// abc begin
// abc end
// def begin
// def end
// ghi begin
// ghi end
// done:
// [ 'abc result', 'def result', 'ghi result' ]


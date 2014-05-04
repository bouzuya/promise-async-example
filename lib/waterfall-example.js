var Promise = require('q').Promise;

var waterfall = function(fs) {
  var context = this;
  return fs.reduce(function(promise, f) {
    return promise.then(function() {
      var args = Array.prototype.slice.call(arguments);
      return f.apply(context, args);
    });
  }, new Promise(function(resolve) { resolve(); }))
};

var doSomething1 = function() {
  return new Promise(function(resolve) {
    resolve(1);
  });
};

var doSomething2 = function(result) {
  return new Promise(function(resolve) {
    resolve(result + 2);
  });
};

var doSomething3 = function(result) {
  return new Promise(function(resolve) {
    resolve(result + 3);
  });
};

waterfall([
  doSomething1, // +1
  doSomething2, // +2
  doSomething3, // +3
]).then(function(result) {
  console.log(result); //=> 6
});



var Promise = require('q').Promise;

var doSomethingAsync = function(msg) {
  return new Promise(function(resolve, reject) {
    console.log(msg + ' begin');
    setTimeout(function() {
      console.log(msg + ' end');
      resolve();
    }, 100);
  });
};

var done = function() { console.log('done'); };

var msgs = ['abc', 'def', 'ghi'];

var usePromiseAll = function() {
  // Promise.all を使うと並行して実行され、すべてが終わると done .
  Promise.all([
    doSomethingAsync(msgs[0]),
    doSomethingAsync(msgs[1]),
    doSomethingAsync(msgs[2]),
  ]).then(done);
};
//
// usePromiseAll();
//
// result:
//
//   abc begin
//   def begin
//   ghi begin
//   abc end
//   def end
//   ghi end 
//   done


var useThenThenThen = function() {
  // then で数珠つなぎに
  new Promise(function(resolve) { resolve(); })
  .then(function() { return doSomethingAsync(msgs[0]); })
  .then(function() { return doSomethingAsync(msgs[1]); })
  .then(function() { return doSomethingAsync(msgs[2]); })
  .then(done);
};
//
// useThenThenThen();
//
// result:
//
//   abc begin
//   abc end
//   def begin
//   def end
//   ghi begin
//   ghi end
//   done

var useReduce = function() {
  msgs.reduce(function(promise, msg) {
    return promise.then(function() { return doSomethingAsync(msg); });
  }, new Promise(function(resolve) { resolve(); }))
  .then(done);
};
//
// useReduce();
//
// result:
//
//   abc begin
//   abc end
//   def begin
//   def end
//   ghi begin
//   ghi end
//   done

var eachSeries = function(arr, f) {
  return arr.reduce(function(promise, item) {
    return promise.then(function() { return f(item); });
  }, new Promise(function(resolve) { resolve(); }));
};
// eachSeries(msgs, doSomethingAsync).then(done);


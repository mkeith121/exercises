var debounce = function (func, wait) {
  var called = false;
  var args;
  var context;

  return function() {
    //Each time function is invoked, update args and context
    args = [].slice.call(arguments);
    context = this;

    //Prevent function invocation while "waiting"
    if(!called) {
      called = true;
      return setTimeout(function() {
        func.apply(context, args);
        called = false;
      }, wait);
    }
  }
}

module.exports = debounce;

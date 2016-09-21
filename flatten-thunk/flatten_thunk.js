function flattenThunk(thunk) {
  return function (cb) {
    function inside (func) {
      var value;
      func(function(x,item) {
        if(typeof item === 'function') {
          inside(item)
        } else {
          cb(null, item);
        }
      });
    }
    inside(thunk);
  }
}

module.exports = flattenThunk;

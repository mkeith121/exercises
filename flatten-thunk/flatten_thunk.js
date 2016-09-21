function flattenThunk(thunk) {
  (function(cb) {
    thunk(function(x,value) {
      cb(value);
    })
  })(function(x) {
    console.log(x);
  })
}


module.exports = flattenThunk;

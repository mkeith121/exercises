function flattenThunk(thunk) {
  var done = false;
  var arr = [];
  var result = thunk(runner);
  while(arr.length) {
    console.log('inhere')
    result = arr.pop()(runner);
  }
  return function(cb) {
    cb(null, result);
  }
}

function runner (error, val) {
  if(typeof val === 'function') {
    console.log(val);
    arr.push(val);
  } else {
    console.log(val);
    done = true;
    return val;
  }
}

module.exports = flattenThunk;

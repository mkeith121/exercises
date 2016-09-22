function throttlePromises (limit, funcArr) {
  var promiseBatches = batchGenerator(limit, funcArr).reverse();
  var batches = [];

  return new Promise (function(resolve) {
    function doIt(batch) {
      promisePacketMaker(batch).then(function(result) {
        batches = batches.concat(result);
        if(promiseBatches.length) {
          doIt(promiseBatches.pop())
        } else {
          resolve(batches);
        }
      })
    }
    doIt(promiseBatches.pop());
  })
}

function promisePacketMaker (arr) {
  var blue = arr;
  var myArr = [];
  var done = blue.length;
  return new Promise (function(resolve) {
    blue.forEach(function(func, index) {
      func().then(function(val) {
        myArr[index] = val;
        done--
        if(!done) {
          resolve(myArr);
        }
      })
    })
  })
}

function batchGenerator (limit, funcArr) {
  var currBatch = [];
  var batches = [];
  funcArr.forEach(function(func, index){
    currBatch.push(func);
    if(currBatch.length === limit) {
      batches.push(currBatch);
      currBatch = [];
    }
  })
  if(currBatch.length) {
    batches.push(currBatch);
  }
  return batches;
}

module.exports = throttlePromises;

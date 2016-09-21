// function throttlePromises (limit, funcArr) {
//   var outputArr = [];
//   var done = funcArr.length;
//   return new Promise (function(resolve) {
//     funcArr.forEach(function(func, index) {
//       func().then(function(val) {
//         outputArr[index] = val;
//         done--;
//         if(!done) {
//           resolve(outputArr);
//         }
//       })
//     })
//   })
// }

function throttlePromises (limit, funcArr) {
  var promiseBatches = batchGenerator(limit, funcArr)
  // .map(function(batch){
  //   console.log('batch: '+batch);
  //   return promisePacketMaker(batch);
  // });
  var myArr = [];
  var done = promiseBatches.length;

  return new Promise (function(resolve) {
    promiseBatches.forEach(function(pb, index) {
      pb().then(function(results){
        myArr[index] = results;
        done--;
        if(!done) {
          resolve(myArr.reduce(function(final, arr) {
            arr.forEach(function(val) {
              final.push(val);
            })
            return final;
          }, []))
        }
      })
    })

  })
}

function promisePacketMaker (arr) {
  var result = [];
  var done = arr.length;
  return new Promise(function(resolve) {
    arr.forEach(function(func,index) {
      func().then(function(val) {
        result[index] = val;
        done--;
        if(!done) {
          resolve(result);
        }
      })
    })
  })
}

function batchGenerator (limit, funcArr) {
  var currBatch = [];
  var batches = [];
  funcArr.forEach(function(func){
    if(currBatch.length === limit) {
      batches.push(currBatch);
      currBatch = [];
    } else {
      currBatch.push(currBatch);
    }
  })
  return batches;
}

module.exports = throttlePromises;

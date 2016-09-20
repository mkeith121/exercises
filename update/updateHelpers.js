module.exports = {
  set: function (item, actionObj) {
    var newObj = Object.assign({}, item);
    var newVal = actionObj;
    var stk = [];
    while(typeof newVal === 'object') {
      if(!stk.length) {
        if(Object.keys(newVal)[0] === '$set') {
          result = Object.assign({}, actionObj['$set']);
          return result;
        }
      }
      stk.push(Object.keys(newVal)[0]);
      newVal = newVal[stk[stk.length - 1]];
    }
    stk.pop();
    stk.reverse();
    var temp = newObj;
    while (stk.length > 1) {
      var a = stk.pop();
      temp = newObj[a];
      temp = Object.assign({}, item[a]);
      newObj[a] = temp;
    }
    temp[stk.pop()] = newVal;
    return newObj;
  },

  merge: function(item, actionObj) {
    return Object.assign({}, actionObj['$merge'], item);
  },

  push: function(array, actionObj) {
    var newArray = array.slice();
    return actionObj['$push'].reduce(function(result,num){
      result.push(num);
      return result;
    }, newArray);
  },

  splice: function(array, actionObj) {
    var newArray = array.slice();
    actionObj['$splice'].forEach(function(args) {
      var start = args[0];
      var end = args[1];
      var insert = args[2];
      newArray.splice(start, end, insert);
    });
    return newArray;
  },

  unshift: function(array, actionObj) {
    var newArray = array.slice();
    return actionObj['$unshift'].reduce(function(result, item) {
      result.unshift(item);
      return result;
    }, array);
  },

  apply: function(item, actionObj) {
    var result = actionObj['$apply'].call(null, item);
    return result;
  }
}

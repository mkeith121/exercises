var update = function(item, actionObj) {
  var st = JSON.stringify(actionObj);
  var re = /((\$set)|(\$merge)|(\$push)|(\$unshift)|(\$splice)|(\$apply))/;
  var matchObj = st.match(re);
  var action = matchObj[0];
  var result;

  switch(action) {
    case '$set':
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
      var b = stk.pop();
      // if(item.hasOwnProperty(b)) {
        temp[b] = newVal;
      // }
      result = newObj;
      break;
    case '$merge':
      var newObj = Object.assign({}, item);
      break;
    case '$push':
      var newArr = item.slice();
      break;
    case '$unshift':
      var newArr = item.slice();
      break;
    case '$splice':
      var newArr = item.slice();
      break;
    case '$apply':
      break;
  }
  return result;
}

module.exports = update;

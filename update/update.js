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
        stk.push(Object.keys(newVal)[0]);
        newVal = newVal[stk[stk.length - 1]];
      }
      var a = stk.shift();
      newObj[a] = Object.assign({}, item[a]);
      newObj[a][stk.shift()] = newVal;
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

function clone (obj) {
  var copy;

  if (null == obj || "object" != typeof obj) return obj;

  if (obj instanceof Array) {
    copy = [];
    for (var i = 0, len = obj.length; i < len; i++) {
        copy[i] = clone(obj[i]);
    }
    return copy;
  }
  if (obj instanceof Object) {
    var copy = {};
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        copy[attr] = clone(obj[attr]);
      }
    }
    return copy;
  }
}

module.exports = update;

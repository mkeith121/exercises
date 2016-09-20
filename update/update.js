var helpers = require('./updateHelpers.js');

var update = function(item, actionObj) {
  var action;
  var st = JSON.stringify(actionObj);
  var re = /((^\$apply)|(\$set)|(\$merge)|(\$push)|(\$unshift)|(\$splice))/;
  var matchObj = st.match(re);
  var action = matchObj[0];
  var result;

  switch(action) {
    case '$set':
      result = helpers.set(item, actionObj);
      break;
    case '$merge':
      result = helpers.merge(item, actionObj);
      break;
    case '$push':
      result = helpers.push(item, actionObj);
      break;
    case '$unshift':
      result = helpers.unshift(item, actionObj);
      break;
    case '$splice':
      result = helpers.splice(item, actionObj);
      break;
    case '$apply':
      result = helpers.apply(item, actionObj);
  }
  return result;
}

module.exports = update;

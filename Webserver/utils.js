
function getVals(obj) {
  for (val in obj) {
    console.log(obj[val])
  }
  console.log(obj)
}


module.exports.getVals = getVals;

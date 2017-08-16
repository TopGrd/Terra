function trim(x) {
  return x.replace(/^\s+|\s+$/gm, '')
}

function isEmpty(obj) {
  for (var name in obj) {
    return false
  }
  return true
}

module.exports = {
  trim,
  isEmpty,
}

getToken = function(token) {
  if(token) {
    var parted = token.split(' ');
    if (parted.length === 2){
      return parted[1]
    } else {
      return null;
    } 
  } else{
    return null;
  }
};

module.exports = {getToken: getToken}

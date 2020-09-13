const hash = "Qmaj3ZhZtHynXc1tpnTnSBNsq8tZihMuV34wAvpURPZZMs";
const bs58 = require('bs58')
const bytes = bs58.decode(hash)
const temp = bytes.toString('hex').substring(4);
//console.log(temp)
var temp2 = "0x".concat(temp);
//console.log(temp2)
console.log(hash.length)
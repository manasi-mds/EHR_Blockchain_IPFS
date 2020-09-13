const ecies = require("eth-ecies");
const util = require('ethereumjs-util')
const publicKey = '00d6e64c0789d886c19b9ff0a92088fb07a97545b1c0441a347238469b44a220c4fd604d88f6377cb0678ef8d15f0ee84f5452e61181390867c607da66fce86b';
const privateKey = '616c0f618793eb4ffc03ddcc793e451803067d8d3cde435fd7a517c7c290cf20';
const data = '{"foo":"bar","baz":42}';
const IPFS = require('ipfs-api');

function encrypt(publicKey, data) {
    let userPublicKey = new Buffer(publicKey, 'hex');
    let bufferData = new Buffer(data);

    let encryptedData = ecies.encrypt(userPublicKey, bufferData);

    return encryptedData.toString('base64')
}

var ans = encrypt(publicKey,data)
console.log(ans)
const ipfs = new IPFS({host: 'ipfs.infura.io', port: 5001, protocol: 'https'});
const randomData = ans // random bytes for testing
var buf = Buffer.from(randomData, 'utf8');
ipfs.add(buf, (err, hash) => {
 if (err) {
   return console.log(err);
 }
 
 console.log("HASH:", hash);
});
// const hash = 'QmajgiCyXfRbJeogcGD3DjkkFVvbV8b8Noprfyk52qUPRS';

// async function decrypt(privateKey, encryptedData) {
//     let userPrivateKey = new Buffer(privateKey, 'hex');
//     let bufferEncryptedData = new Buffer(encryptedData, 'base64');
//     console.log(userPrivateKey,bufferEncryptedData)

//     let decryptedData = ecies.decrypt(userPrivateKey, bufferEncryptedData);
    
//     return decryptedData.toString('utf8');
// }
// // var eans
// // ipfs.cat(hash, (err, data) => {
// //  if (err) {
// //    return console.log(err);
// //  }
 
// //  console.log("DATA:", data.toString('utf8'));
// //  eans = data.toString()
// //  var fans = decrypt(privateKey,eans)
// // console.log(fans)
// // });
// async function test()
// {


// var temp1="B/9Z1awURZ4x46HpwAc0FARGaFXUGig7eLn2h5HcejkB79JLkDbYp5916yKvfHJTjnAljYxLa4UxFCYDfeutp9H67gO+H8Lw/zhrdh2UWYIU1BTAj1YSAqneb4XuZaih6GXFv/mUaed8r9yRhLHs6+GQ1qdD1mqhKhZEbB9/Y5MafUO/N0f0/ZB3T8Tr1zD04A=="
// var temp2="616c0f618793eb4ffc03ddcc793e451803067d8d3cde435fd7a517c7c290cf20"
// var fans = await decrypt(temp2.toString(),temp1.toString());
// console.log(fans)

// }

// test()

//var eans = 'B/9Z1awURZ4x46HpwAc0FARGaFXUGig7eLn2h5HcejkB79JLkDbYp5916yKvfHJTjnAljYxLa4UxFCYDfeutp9H67gO+H8Lw/zhrdh2UWYIU1BTAj1YSAqneb4XuZaih6GXFv/mUaed8r9yRhLHs6+GQ1qdD1mqhKhZEbB9/Y5MafUO/N0f0/ZB3T8Tr1zD04A=='



//deriving public key from private key
// var temp = util.privateToPublic('0x616c0f618793eb4ffc03ddcc793e451803067d8d3cde435fd7a517c7c290cf20')
// console.log(temp.toString('hex'))

//testing proxy re-encyrption



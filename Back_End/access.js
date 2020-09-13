var fs = require('fs');
Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":true,"inputs":[{"name":"combinedkey","type":"string"}],"name":"ViewAccess","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"combinedkey","type":"string"},{"name":"hash1","type":"bytes32"},{"name":"hash2","type":"bytes32"}],"name":"GrantAccess","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"combinedkey","type":"string"}],"name":"RevokeAccess","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')

var contractAddress = '0x7723d4d3e2d74126313556bda905f15ad56b9949';
AccessContract = web3.eth.contract(abi);

contractInstance = AccessContract.at(contractAddress);

web3.eth.defaultAccount=web3.eth.accounts[2];


 //storing data and retrieving hash
//const IPFS = require('ipfs-api'); 
//const ipfs = new IPFS({host: 'ipfs.infura.io', port: 5001, protocol: 'https'});
//const randomData = "8803cf48b8805198dbf85b2e0d514320"; // random bytes for testing
//var buf = Buffer.from(randomData, 'utf8');
//ipfs.add(buf, (err, hash) => {
//    if (err) {
//        return console.log(err);
//    }
 
//    console.log("HASH:", hash);
//});




const hash = "Qmaj3ZhZtHynXc1tpnTnSBNsq8tZihMuV34wAvpURPZZMs";
var pub1 = "dc37d9ab0d146182121d1f0b6c0a0103cd0e03d0";
var pub2 = "877e7042a4ccbf1aaea9761a4d748dd4dc068641";
pub1 = pub1+pub2;

contractInstance.GrantAccess(pub1,web3.fromAscii(hash.substr(0,24)),web3.fromAscii(hash.substr(24,46)),{from: web3.eth.accounts[2], gas:3000000});
console.log(contractInstance.ViewAccess(pub1));
contractInstance.RevokeAccess(pub1);
console.log(contractInstance.ViewAccess(pub1));
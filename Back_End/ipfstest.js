// // //use proxy free internet 
var fs = require('fs');
// Web3 = require('web3');
// web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// abi = JSON.parse('[{"constant":false,"inputs":[{"name":"patientkey","type":"string"},{"name":"hash1","type":"bytes32"},{"name":"hash2","type":"bytes32"}],"name":"storeHash","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"num","type":"uint256"}],"name":"getPatientHash","outputs":[{"name":"","type":"string"},{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"patientArray","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getListLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')

// var contractAddress = '0xc48f1963571fda71468fa62e662da4d268acb6b6'
// VotingContract = web3.eth.contract(abi);
// // In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
// contractInstance = VotingContract.at(contractAddress);

// web3.eth.defaultAccount=web3.eth.accounts[2];

// //storing data and retrieving hash
const IPFS = require('ipfs-api');
const ipfs = new IPFS({host: 'ipfs.infura.io', port: 5001, protocol: 'https'});
// const randomData = "8803cf48b8805198dbf85b2e0d514320"; // random bytes for testing
// var buf = Buffer.from(randomData, 'utf8');
// ipfs.add(buf, (err, hash) => {
//  if (err) {
//    return console.log(err);
//  }
 
//  console.log("HASH:", hash);
// });
//const hash = "Qmaj3ZhZtHynXc1tpnTnSBNsq8tZihMuV34wAvpURPZZMs";
const hash = 'QmXPD5rpQhJjKq6jwvs4N6TQmbRjL7EvMoikAeYGmebRTf';
// contractInstance.storeHash("1234",web3.fromAscii(hash.substr(0,24)),web3.fromAscii(hash.substr(24,46)),{from: web3.eth.accounts[2], gas:3000000});
// var l = contractInstance.getListLength();
// console.log(l.toString())
// var l2 = contractInstance.getPatientHash(0,{from: web3.eth.accounts[2], gas:3000000}).toString();
// console.log(l2)
//extraacting data from hash
ipfs.cat(hash, (err, data) => {
 if (err) {
   return console.log(err);
 }
 
 console.log("DATA:", data.toString('utf8'));
});
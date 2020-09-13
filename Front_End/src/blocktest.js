Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// var info = web3.eth.getBlock(3150);
// console.log(info);
var transaction = web3.eth.getTransaction('0x000f87e8d25243164a9d365229618a3b02f3c05b826c8211c6bbc857aac23959');
console.log(transaction);
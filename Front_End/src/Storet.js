import Web3 from 'web3';
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var abi = JSON.parse('[{"constant":false,"inputs":[{"name":"patientkey","type":"string"},{"name":"hash1","type":"bytes32"},{"name":"hash2","type":"bytes32"}],"name":"storeHash","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"patientArray","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"hash","type":"string"}],"name":"getPatientHash","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getListLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')

var contractAddress = '0xa33343a497bfaa4ec2709db291777e1ad4f4e123'

var VotingContract = web3.eth.contract(abi);
var contractInstance = VotingContract.at(contractAddress);

export default contractInstance;
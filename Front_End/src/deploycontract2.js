var fs = require('fs');
Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

code = fs.readFileSync('Access.sol').toString();
solc = require('solc');
compiledCode = solc.compile(code);

abiDefinition = JSON.parse(compiledCode.contracts[':Access'].interface)
VotingContract = web3.eth.contract(abiDefinition)
byteCode = compiledCode.contracts[':Access'].bytecode
deployedContract = VotingContract.new({data: byteCode, from: web3.eth.accounts[1], gas: 4700000})
contractInstance = VotingContract.at(deployedContract.address)
var solc = require('solc');
var Web3 = require('web3');
var fs = require('fs');
var path = require('path');
var BLOCKCHAIN_URL = "http://localhost:8545";

var web3 = new Web3(new Web3.providers.HttpProvider(BLOCKCHAIN_URL));

var contractFile = path.join(__dirname, 'Ethsurance.sol');
var code = fs.readFileSync(contractFile).toString();
var compiledCode = solc.compile(code);

var abiDefinition = JSON.parse(compiledCode.contracts[':Ethsurance'].interface);
var byteCode = compiledCode.contracts[':Ethsurance'].bytecode;

var contract = new web3.eth.Contract(abiDefinition);

web3.eth.getAccounts().then(function(accounts) {
  console.log(accounts);
  contract.deploy({
    data: byteCode
  }).send({
      from: accounts[0],
      gas: 4700000
  })
  .then(function(newContractInstance){
    var contract = {
      address: newContractInstance.options.address,
      abi: abiDefinition
    }

    var contractPath = path.join(__dirname, 'src', 'static', 'contract.json');
    var contractContent = JSON.stringify(contract);
    fs.writeFile(contractPath, contractContent, 'utf8', function (err) {
        if (err) return console.log(err);
    });
  });
});

const Web3 = require("web3");

const web3 = new Web3("http://localhost:8042");

const balance = web3.eth.getBalance(eth.coinbase);
console.log(balance);

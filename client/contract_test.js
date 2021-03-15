const Web3 = require("web3");
const SrvExchange = require("./src/contracts/SrvExchange.json");

const init = async () => {
  const web3 = new Web3("http://localhost:8042");

  const networkId = await web3.eth.net.getId();
  const address = SrvExchange.networks[networkId].address;

  const contract = new web3.eth.Contract(SrvExchange.abi, address);
  accounts = await web3.eth.getAccounts();

  contract.methods
    .initAccount(Web3.utils.toChecksumAddress(accounts[0]))
    .send({ from: accounts[0] });
};

init();

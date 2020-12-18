const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "localhost",
      port: 8042,
      network_id: "42", // Match any network id
      gas: 4712388,
    },
  },
  contracts_build_directory:
    "/Users/zhezhai/VscodeProjects/BlockChain/Time_Banking/client/src/contracts",
  compilers: {
    solc: {
      version: "0.4.18",
    },
  },
};

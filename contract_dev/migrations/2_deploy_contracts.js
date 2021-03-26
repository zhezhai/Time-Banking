var SrvExchange_1 = artifacts.require("./SrvExchange_1.sol");
var SrvExchange_2 = artifacts.require("./SrvExchange_2.sol");
var SrvExchange_3 = artifacts.require("./SrvExchange_3.sol");
var SrvExchange_4 = artifacts.require("./SrvExchange_4.sol");
var SrvExchange_5 = artifacts.require("./SrvExchange_5.sol");

module.exports = function (deployer) {
  deployer.deploy(SrvExchange_1);
  deployer.deploy(SrvExchange_2);
  deployer.deploy(SrvExchange_3);
  deployer.deploy(SrvExchange_4);
  deployer.deploy(SrvExchange_5);
};

import json
from SrvExchangeToken import SrvExchangeToken

http_provider = 'http://localhost:7545'
contract_addr_list = json.load(open('./data/contract_addr_list.json'))
contract_config = '/Users/zhezhai/VscodeProjects/BlockChain/Time_Banking/client/src/contracts/{}.json'

mySrvExchange = dict()

# new SrvExchangeToken object
for key, value in contract_addr_list.items():
    mySrvExchange[value] = SrvExchangeToken(
        http_provider, value, contract_config.format(key))

if __name__ == "__main__":
    print('hello!')
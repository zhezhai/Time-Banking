## BIT
Official implementation of paper "BIT: A Blockchain Integrated Time Banking System for Community Exchange Economy". 

For Ethereum private network configuration, please refer to [link](https://github.com/samuelxu999/Blockchain_dev/tree/master/MyChains).

For smart contract development, please refer to [Truffle](https://truffleframework.com/docs) for truffle environment setup and usage. The demo application is developed by python and Flask.

### Microservices implementation
The concept proof system is deployed and run on a microservices SOA framework. You can access microservices projects reousrce on github: 
[AuthID](https://github.com/samuelxu999/Microservices_dev/tree/master/Services_dev/AuthID); 
[BlendCAC](https://github.com/samuelxu999/Microservices_dev/tree/master/Services_dev/BlendCAC); 
[TimeBanking](https://github.com/samuelxu999/Microservices_dev/tree/master/Services_dev/TimeBanking).


### contract_dev
This is truffle folder to develop smart contract for TB service exchange implementation.
* contract:

	--- SrvExchange.sol: Service exchange contract to support service querying, negotiation and payment.
	
	--- Migrations.sol: This is a separate Solidity file that manages and updates the status of your deployed smart contract. This file comes with every Truffle project, and is usually not edited.
	
* migrations:

	--- 1_initial_migration.js: This file is the migration (deployment) script for the Migrations contract found in the Migrations.sol file.
	
	--- 2_deploy_contracts.js: This file is the migration (deployment) script for deploying our developed smart contract Solidity files.
	

### server
The prototype desgin of BIT by using python. 
* SrvExchangeToken.py: This module provide encapsulation of web3.py API to interact with SrvExchange.sol smart contract.

* SrvExchange_Server.py: This module provide encapsulation of RestFul web-service API that handle and response client's request.

* Test_Client.py: This module defines test cases to evaluate performance.

* addr_list.json: This json file records all participants' account address used in prototype.

* service_utils.py: This module provide encapsulation of TB SrvExchangeClient API that access to RestFul web-service API.

* services_list.json: This json file saves deployed micorservice nodes' IP address used in prototype.

* utilities.py: This module provide basic utility functions to support project.

### front-end
The front-end to create the user interface, designed using react and web3.js
* component: This folder contains the module required by the website.

* pages: This folder contains the pages of the website.

* App.js: using react-routing-dom to perform the routing between different pages.

### operation instruction
* You can use IP address: 128.226.88.250:3000 to visit the website, you should see the login page once you visited.
* I have already registered four accounts that are already to use:  
	--- name: account1 password:123  
	--- name: account2 password:123  
	--- name: account3 password:123  
	--- name: account4 password:123  
  the initial account balance is 500 for each account, so the service price can't be greater than 500.	
* You can choose any account from account list to login, once you are logged in, you can post a service given service name, price, the role you are going to be in service(provider or recipient) and one aviliable contract address to complete the service registration. successfully posted service will be displayed on dashboard page.
* Then you can sign out the current account and log in to another account to take the service. If the service is posted by provider, you can click "but service" button to participant in the service, then the service will be added to MyService page, if the service is posted by recipient, you can click "provide service" to become the provider and wait for the service recipient for further operation.
* In my service page, you can see the service you choosed, then click the button, wait a few seconds till a window comes out says “wait for provider confirm”, that means the service need to be confirmed by the provider who provides this service. Then you can log in to provider account, go to ProviderConfirm page and confirm the service, you should see a window comes out after few seconds.
* Once the service is confirmed by provider, you can log in to recipient's account and go to Payment page to complete the payment, click the button and wait for a few seconds until you see a window comes out.
* after the service payment procedure, provider will get the money from recipient and add to his balance, you can check the user balance on MyInfo page.




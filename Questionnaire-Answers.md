# Chainalysis Questionnaire:

1) Are there any sub-optimal choices( or short cuts taken due to limited time ) in your implementation?

Ans: Since this application doesn't require signing in with Coinbase or Binance credentials, I used direct HTTP requests to obtain information from their API's. A more secure approach would have been to use the npm packages of each exchange's API, and obtain the information with secure API keys. On the frontend, there are also multiple components in the App.js file. It would have been cleaner practice to separate the components into their own files. 

2) Is any part of it over-designed? ( It is fine to over-design to showcase your skills as long as you are clear about it)

Ans: No, the application does exactly as the requirements say: no more than that. 

3) If you have to scale your solution to 100 users/second traffic what changes would you make, if any?

Ans: I would increase the number of servers, and use a load balancer to help spread the traffic.  

4) What are some other enhancements you would have made, if you had more time to do this implementation

Ans: If I had more time for this implementation, I would have allowed the user to select from a list of multiple exchanges and multiple cryptocurrencies. Retaining the current design format, I would have allowed the user to see exactly which cryptocurrency was easier to buy and sell between their two selected exchanges for comparison. This would allow the user not to be restricted by only BTC and ETH, and only Coinbase and Binance. 



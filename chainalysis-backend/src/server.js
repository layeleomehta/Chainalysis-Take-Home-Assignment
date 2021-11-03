const express = require('express'); 
const axios = require('axios'); 
require('dotenv').config();

// error handler
function errorHandler(err, req, res, next) {
    return res.status(err.status || 500).json({
      error: {
        message: err.message || 'Oops! Something went wrong.'
      }
    });
  }
  

// function which makes a call to the coinbase API (takes in specified crypto and buy/sell)
async function coinbaseCall(btcOrEth, buyOrSell){
    const COINBASE_BASE_URL = "https://api.coinbase.com/v2";
    try {
        const response = await axios.get(`${COINBASE_BASE_URL}/prices/${btcOrEth}/${buyOrSell}`);
        return parseFloat(response.data.data.amount);
      } catch (error) {
        console.error(error);
      }
}

// function which makes call to binance API (takes in specified crypto)
async function binanceCall(btcOrEth){
    const BINANCE_BASE_URL = "https://api.binance.com";
    try {
        const response = await axios.get(`${BINANCE_BASE_URL}/api/v3/ticker/24hr?symbol=${btcOrEth}`);
        obj = {
            buy: parseFloat(response.data.askPrice).toFixed(2),
            sell: parseFloat(response.data.bidPrice).toFixed(2)
        }
        return obj;
      } catch (error) {
        console.error(error);
      }
}


const app = express(); 

// get route which returns a formatted JSON object with crypto information
app.get('/api', async (req, res) => {
    // get coinbase BTC buy and sell prices
    var cbBTCbuy = await coinbaseCall("BTC-USD", "buy"); 
    var cbBTCsell = await coinbaseCall("BTC-USD", "sell"); 

    // get coinbase ETH buy and sell prices
    var cbETHbuy = await coinbaseCall("ETH-USD", "buy"); 
    var cbETHsell = await coinbaseCall("ETH-USD", "sell"); 

    // get binance BTC buy and sell prices
    var biBTCobj = await binanceCall("BTCUSDC"); 
    var biBTCbuy = biBTCobj.buy; 
    var biBTCsell = biBTCobj.sell; 

    // get binance ETH buy and sell prices
    var biETHobj = await binanceCall("ETHUSDC"); 
    var biETHbuy = biETHobj.buy; 
    var biETHsell = biETHobj.sell; 

    // create recommendation:
    // buy and sell rec's
    var btcBuyRec = ""
    var ethBuyRec = ""
    var btcSellRec = ""
    var ethSellRec = ""

    // btc buy and sell rec
    if(cbBTCbuy < biBTCbuy){
        btcBuyRec = "Buy from Coinbase!"
    }
    else if(cbBTCbuy > biBTCbuy){
        btcBuyRec = "Buy from Binance!"
    }
    else{
        btcBuyRec = "Buy price is the same!"
    }

    if(cbBTCsell > biBTCsell){
        btcSellRec = "Sell on Coinbase!"
    }
    else if(cbBTCsell < biBTCsell){
        btcSellRec = "Sell on Binance!"
    }
    else{
        btcSellRec = "Sell price is the same!"
    }

    // eth buy and sell rec
    if(cbETHbuy < biETHbuy){
        ethBuyRec = "Buy from Coinbase!"
    }
    else if(cbETHbuy > biETHbuy){
        ethBuyRec = "Buy from Binance!"
    }
    else{
        ethBuyRec = "Buy price is the same!"
    }

    if(cbETHsell > biETHsell){
        ethSellRec = "Sell on Coinbase!"
    }
    else if(cbETHsell < biETHsell){
        ethSellRec = "Sell on Binance!"
    }
    else{
        ethSellRec = "Sell price is the same!"
    }

    // creating a JSON object with all the information required for the frontend
    const returnObj = {
        bitcoin:{
          coinbaseBuy: cbBTCbuy,
          coinbaseSell: cbBTCsell, 
          binanceBuy: biBTCbuy,
          binanceSell: biBTCsell
        },
        ethereum:{
          coinbaseBuy: cbETHbuy,
          coinbaseSell: cbETHsell, 
          binanceBuy: biETHbuy,
          binanceSell: biETHsell
        },
        recommendation:{
          bitcoinBuyRec: btcBuyRec, 
          bitcoinSellRec: btcSellRec,
          ethereumBuyRec: ethBuyRec,
          ethereumSellRec: ethSellRec
        }
      }

    res.json(returnObj); 
});

app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

app.use(errorHandler); 

module.exports = app; 

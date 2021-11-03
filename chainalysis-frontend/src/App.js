import './App.css';
import React, { Component } from 'react';
import { Card } from 'primereact/card';
const axios = require('axios'); 

class CardDemo extends Component {
  constructor(props){
    super(props)
    console.log(this.props)
  }

  render() {
      const header = (
          <img alt="Card" src={this.props.imageUrl} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />
      );
      const footer = (
          <span>
          </span>
      );

      return (
          <div>

              <Card title={this.props.exchangeName} style={{ width: '15em' }} footer={footer} header={header}>
                  <p className="p-m-0" style={{lineHeight: '1.5'}}><b>Buy: </b> {this.props.buy}</p>
                  <p className="p-m-0" style={{lineHeight: '1.5'}}><b>Sell: </b> {this.props.sell}</p>
              </Card>
          </div>
      )
  }
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        bitcoin:{
          coinbaseBuy: "Loading",
          coinbaseSell: "Loading", 
          binanceBuy: "Loading",
          binanceSell: "Loading"
        },
        ethereum:{
          coinbaseBuy: "Loading",
          coinbaseSell: "Loading", 
          binanceBuy: "Loading",
          binanceSell: "Loading"
        },
        recommendation:{
          bitcoinBuyRec: "Loading", 
          bitcoinSellRec: "Loading", 
          ethereumBuyRec: "Loading",
          ethereumSellRec: "Loading"
        }
      }
    }

  async fetchCryptoData(){
    try {
      const response = await axios.get('/api');
      //console.log(response.data); 
      return response.data; 
    } catch (error) {
      console.error(error);
    }
    

  }
  componentDidMount(){  
    this.fetchCryptoData()
      .then(data => {this.setState({
        bitcoin:{
          coinbaseBuy: data.bitcoin.coinbaseBuy + " USD",
          coinbaseSell: data.bitcoin.coinbaseSell + " USD", 
          binanceBuy: data.bitcoin.binanceBuy + " USD",
          binanceSell: data.bitcoin.binanceSell + " USD"
        },
        ethereum:{
          coinbaseBuy: data.ethereum.coinbaseBuy + " USD",
          coinbaseSell: data.ethereum.coinbaseSell + " USD", 
          binanceBuy: data.ethereum.binanceBuy + " USD",
          binanceSell: data.ethereum.binanceSell + " USD"
        },
        recommendation:{
          bitcoinBuyRec: data.recommendation.bitcoinBuyRec, 
          bitcoinSellRec: data.recommendation.bitcoinSellRec, 
          ethereumBuyRec: data.recommendation.ethereumBuyRec,
          ethereumSellRec: data.recommendation.ethereumSellRec
        }
        
      })});
  }

  render(){
  return (
    <div className="App">

      <div class="split left">
        <div class="centered">
          <h1>Bitcoin</h1>
          <p> Here are the buy/sell prices of Bitcoin</p>
          <div id="main" class="clear" align="center">
            <div id="sidebar">
              <CardDemo exchangeName="Coinbase"
              imageUrl="https://www.thestreet.com/.image/c_fit%2Ccs_srgb%2Cq_auto:good%2Cw_620/MTg0MDA0NjIxOTQzOTczNTc3/coinbase-logo.png"
              buy={this.state.bitcoin.coinbaseBuy}
              sell={this.state.bitcoin.coinbaseSell}
            ></CardDemo></div>
            <div id="page-wrap">
              <CardDemo exchangeName="Binance"
              imageUrl="https://cryptologos.cc/logos/binance-coin-bnb-logo.png"
              buy={this.state.bitcoin.binanceBuy}
              sell={this.state.bitcoin.binanceSell}
              ></CardDemo></div>

              <p><b>Buy Recommendation:</b> {this.state.recommendation.bitcoinBuyRec}</p>
              <p><b>Sell Recommendation:</b> {this.state.recommendation.bitcoinSellRec}</p>
          </div>
        </div>
      </div>

      <div class="split right">
        <div class="centered">
          <h1>Ethereum</h1>
          <p>Here are the buy/sell prices of Ethereum</p>
          <div id="main" class="clear" align="center">
            <div id="sidebar">
              <CardDemo exchangeName="Coinbase" 
              imageUrl="https://www.thestreet.com/.image/c_fit%2Ccs_srgb%2Cq_auto:good%2Cw_620/MTg0MDA0NjIxOTQzOTczNTc3/coinbase-logo.png"
              buy={this.state.ethereum.coinbaseBuy}
              sell={this.state.ethereum.coinbaseSell}
              ></CardDemo></div>
            <div id="page-wrap">
              <CardDemo exchangeName="Binance"
              imageUrl="https://cryptologos.cc/logos/binance-coin-bnb-logo.png"
              buy={this.state.ethereum.binanceBuy}
              sell={this.state.ethereum.binanceSell}
              ></CardDemo></div>

              <p><b>Buy Recommendation:</b> {this.state.recommendation.ethereumBuyRec}</p>
              <p><b>Sell Recommendation:</b> {this.state.recommendation.ethereumSellRec}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
}


export default App;

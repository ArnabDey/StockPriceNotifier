import React, { Component } from 'react';
import StockList from './containers/StockList';
import Particles from 'react-particles-js';

import './App.css';
import { StockData } from './StockData';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
        data: [{
            stockName: 'APPL',
            target: 100,
            price: 20
        }, {
            stockName: 'APPL',
            target: 100,
            price: 20
        }],
        stockName: '',
        targetPrice: ''
    }
  }

  stockNameChange(event) {
    this.setState({stockName: event.target.value});
    console.log(this.state.stockName);
  }

  stockPriceChange(event) {
    this.setState({targetPrice: event.target.value});
    console.log(this.state.targetPrice);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.stockName + " " + this.state.targetPrice);
    let updateArray = this.state.data.concat({
              stockName: this.state.stockName,
              target: this.state.targetPrice,
              price: 100});
    this.setState({ data: updateArray });
    this.setState({ stockName: '' });
    this.setState({ targetPrice: '' })

  }
  render() {
    return (
      <div className="App">
        <div>
          <h1 id="title"> Stock Tracker and Notification System</h1>
          <form
            onSubmit={this.handleSubmit.bind(this)}
            id="searching">
            <input
              name="stockName"
              type="text"
              id="stockName"
              placeholder="Stock Symbol"
              value={this.state.stockName}
              required
              onChange={this.stockNameChange.bind(this)}
            />
            <input
              name="targetPrice"
              type="text"
              id="targetPrice"
              placeholder="Target Price"
              value={this.state.targetPrice}
              required
              onChange={this.stockPriceChange.bind(this)}
            />
            <button id="searchButton">Save</button>
          </form>
          <br/>
          <StockList
            data={this.state.data}
            id="stockList"/>
        </div>
      </div>
    );
  }
}
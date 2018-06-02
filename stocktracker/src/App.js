import React, { Component } from 'react';
import StockList from './containers/StockList';
import Particles from 'react-particles-js';

import './App.css';
import { StockData } from './StockData';

const particlesOptions = {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area:800
            }
        }
    }
};

export default class App extends Component {
  constructor() {
    super();
    this.state = {
        sample: [{
            stockName: 'APPL',
            target: 100,
            price: 20
        }, {
            stockName: 'APPL',
            target: 100,
            price: 20
        }],
        stockName: '',
        targetPrice: 0
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
  }
  render() {
    return (
      <div className="App">
        <Particles className="particles"
          params={particlesOptions}
        />
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
              required
              onChange={this.stockNameChange.bind(this)}
            />
            <input
              name="targetPrice"
              type="text"
              id="targetPrice"
              placeholder="Target Price"
              required
              onChange={this.stockPriceChange.bind(this)}
            />
            <button id="searchButton">Save</button>
          </form>
          <br/>
          <StockList
            sample={this.state.sample}
            id="stockList"/>
        </div>
      </div>
    );
  }
}
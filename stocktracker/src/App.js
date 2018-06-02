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
        }]
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log(data);
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
            onSubmit={this.handleSubmit}
            id="searching">
            <input
              name="stockName"
              type="text"
              id="stockName"
              placeHolder="Stock Symbol"
            />
            <input
              name="targetPrice"
              type="text"
              id="targetPrice"
              placeHolder="Target Price"
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
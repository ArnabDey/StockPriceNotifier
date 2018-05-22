import React, { Component } from 'react';
import logo from './logo.svg';
import StockList from './containers/StockList';
import './App.css';
import { StockData } from './StockData';


export default class App extends Component {
  constructor() {
    super();
    this.state = {
        sample: [{
            name: 'APP',
            target: 100,
            price: 20
        }]
    }
  }
  render() {
    return (
      <div className="App">
        <h1 id="title"> Stock Tracker and Notification System</h1>
        <form className="searching">
          <input type="text" id="search" placeholder="Stock Name"></input>
          <input type="text" id="search" placeholder="Target Price"></input>
          <input type="submit" id="searchButton"></input>
        </form>
        <div>
          <StockList sample = {this.state.sample} />
        </div>
      </div>
    );
  }
}
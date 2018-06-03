import React, { Component } from 'react';
import StockList from './containers/StockList';

import './App.css';

export default class App extends Component {
  componentDidMount() {
    fetch('/all')
      .then((res) => {
        return res.json();
      }).then((data) => {
        console.log(data);
          this.setState({ data: data });
      });
  }
  constructor() {
    super();
    this.state = {
        data: [],
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
    console.log(this.state.stockName + " " + this.state.targetPrice);
    let updateArray = this.state.data.concat({
              stockName: this.state.stockName,
              target: this.state.targetPrice,
              price: 100});
    this.setState({ data: updateArray });
    this.setState({ stockName: '' });
    this.setState({ targetPrice: '' })
    fetch('/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: `${this.state.stockName}`,
        targetPrice: `${this.state.targetPrice}`
      })
    })
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
            <a href="javascript:alert('If there is no update on the list, try
            refreshing and ensure that the name of the stock is not already on
            the list')" id="moreInfo">More Info</a>
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
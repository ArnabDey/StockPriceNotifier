import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 id="title"> Stock Tracker and Notification System</h1>
        <form className="searching">
          <input type="text" id="search"></input>
          <input type="submit" id="searchButton"></input>
        </form>
        <table id="mainTable">
            <tr>
              <th>Stock Symbol</th>
              <th>Current Price</th>
              <th>Target Price</th>
            </tr>
        </table>
      </div>
    );
  }
}

export default App;

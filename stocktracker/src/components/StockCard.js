import React, { Component } from 'react';

import './StockCard.css';

class StockCard extends Component {
  componentDidMount() {
    if (this.loadData()) {
        this.loadData().then((val) => {
          console.log(val);
          this.setState({ currPrice: val });
          window.location.reload(true);
      });
    }
  }

  loadData() {
      fetch(`/notify/${this.props.name}`)
        .then((res) => {
          return res.json();
        }).then((data) => {
          return data.higestVal;
        });
  }

  constructor(props) {
    super(props);
    this.state = {
        currPrice: ''
    }
  }

  render() {
    console.log(this.state.currPrice);
    return(
            <div className="stockCard">
                <h2>{this.props.name}</h2>
                <p> Current Price: </p>
                <p>>{this.state.currPrice}</p>
                <p> Target Price: </p>
                <p> ${this.props.target}</p>
            </div>
      );
  }
}

export default StockCard;
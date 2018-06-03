import React, { Component } from 'react';

import './StockCard.css';

class StockCard extends Component {
  componentDidMount() {
    if (this.loadData()) {
        this.loadData().then((val) => {
          console.log(val);
          this.setState({ currPrice: val });
      });
    }
  }

  loadData() {
      fetch(`/notify/${this.props.name}`)
        .then((res) => {
          return res.json();
        }).then((data) => {
          console.log(data.higestVal);
          return data.higestVal;
        });
  }

  constructor(props) {
    super(props);
    this.state = {
        currPrice: ''
    }
  }

  deleteStock() {
    console.log('Delete');
  }
  dosomething() {
    console.log('here');
  }
  render() {
    // console.log(this.state.currPrice);
    return(
            <div className="stockCard">
                <h2>{this.props.name}</h2>
                <p> Target Price: </p>
                <p> ${this.props.target}</p>
                <form onSubmit={this.deleteStock}>
                  <button id="delete"
                  onClick={this.dosomething()}> Delete </button>
                </form>
                <br/>
                <br/>
            </div>
      );
  }
}

export default StockCard;
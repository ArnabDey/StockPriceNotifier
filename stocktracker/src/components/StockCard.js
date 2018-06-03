import React, { Component } from 'react';

import './StockCard.css';

class StockCard extends Component {
  componentWillMount() {
      fetch(`/notify/${this.props.name}`)
        .then((res) => {
          return res.json();
        }).then((data) => {
          console.log(data);
          let currPrice = `$${data.highestVal}`
          this.setState({ currPrice: currPrice });
          return data.highestVal;
        }).catch((e) => {
          this.setState({ currPrice: "The stock market is closed currently" });
        });
    }

  constructor(props) {
    super(props);
    this.state = {
        currPrice: ''
    }
  }


  delete(name) {
    console.log('Delete', name);
    fetch(`/${name}`, {
      method: 'DELETE',
    });
    window.location.reload(true);
  }

  render() {
    // console.log(this.state.currPrice);
    let name = this.props.name;
    let targetPrice = this.props.target;
    return(
            <div className="stockCard">
                <h2>{name}</h2>
                <p> Target Price: </p>
                <p> ${targetPrice}</p>
                <p> Current Price: </p>
                <p> {this.state.currPrice}</p>
                <button id="delete"
                  onClick={this.delete.bind(this, name)}> Delete </button>
                <br/>
                <br/>
            </div>
      );
  }
}

export default StockCard;
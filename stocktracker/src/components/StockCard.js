import React, { Component } from 'react';

import './StockCard.css';

class StockCard extends Component {
  componentWillMount() {
      fetch(`/notify/${this.props.name}`)
        .then((res) => {
          return res.json();
        }).then((data) => {
            this.setState({ currPrice: data.highestVal });
          return data.highestVal;
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
                <p> ${this.state.currPrice}</p>
                <button id="delete"
                  onClick={this.delete.bind(this, name)}> Delete </button>
                <br/>
                <br/>
            </div>
      );
  }
}

export default StockCard;
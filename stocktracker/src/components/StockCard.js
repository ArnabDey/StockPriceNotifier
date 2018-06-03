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
          return data.higestVal;
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
                <button id="delete"
                  onClick={this.delete.bind(this, name)}> Delete </button>
                <br/>
                <br/>
            </div>
      );
  }
}

export default StockCard;
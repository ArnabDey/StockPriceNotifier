import React, { Component } from 'react';
import StockCard from '../components/StockCard';

export default class StockList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
    return(
        <div>
        {
            (this.props.data).map((activity, i) => {
                return(
                    <div>
                        <StockCard
                            name={this.props.data[i].stockName}
                            target={this.props.data[i].target}
                            price={this.props.data[i].price}
                        />
                        <br/>
                    </div>
                );
            })
        }
        </div>
    );
    }
}
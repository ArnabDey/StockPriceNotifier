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
            (this.props.sample).map((activity, i) => {
                return(
                    <div>
                        <StockCard
                            name={this.props.sample[i].stockName}
                            target={this.props.sample[i].target}
                            price={this.props.sample[i].price}
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
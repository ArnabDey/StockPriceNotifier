import React, { Component } from 'react';
import StockCard from '../components/StockCard';

export default class StockList extends Component {
    render() {
        return(
            <div>
            {
                (this.props.data).map((activity, i) => {
                    return(
                        <div>
                            <StockCard
                                name={this.props.data[i]._id}
                                target={this.props.data[i].targetPrice}
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
import React, { Component } from 'react';
import StockCard from '../components/StockCard';


const StockList = ({ sample }) => {
    return(
        <div>
        {
            sample.map((activity, i) => {
                return(
                    <StockCard
                        name={sample[i].name}
                        target={sample[i].target}
                        price={sample[i].price}
                    />
                );
            })
        }
        </div>
    );
}

export default StockList;

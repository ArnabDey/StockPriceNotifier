import React, { Component } from 'react';

const StockCard = ({ name, price, target }) => {
        return(
            <div className="stockCard">
                <div>
                    <h2>{name}</h2>
                    <p> Current Price: </p>
                    <p> {price}</p>
                    <p> Target Price: </p>
                    <p> {target}</p>
                </div>
            </div>
        );
    }
export default StockCard;
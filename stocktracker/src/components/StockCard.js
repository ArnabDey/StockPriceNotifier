import React, { Component } from 'react';

import './StockCard.css';

const StockCard = ({ name, price, target }) => {
        return(
            <div className="stockCard">
                <h2>{name}</h2>
                <p> Current Price: </p>
                <p> ${price}</p>
                <p> Target Price: </p>
                <p> ${target}</p>
            </div>
        );
    }
export default StockCard;
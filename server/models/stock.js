let mongoose = require('mongoose');


let Stock = mongoose.model('Stocks', {
    _id: {
        type: String,
        required: true
    },
    targetPrice: {
        type: Number,
        required: true
    }
})

module.exports = {
    Stock
};
require('dotenv').config({path: __dirname + '/../.env'});

const axios = require('axios');
const moment = require('moment');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

let mongoose = require('./db/mongoose');
let { Stock } = require('./models/stock');
let app = express();




const key = process.env.STOCK_KEY;

app.use(bodyParser.json());

app.get('/notify/:stock', (req, res) => {
    let { stock } = req.params;
    let url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stock}&interval=1min&apikey=${key}`;
    axios.get(url).then((response) => {
        let date = moment().format('YYYY-MM-DD HH:mm:ss');
        let dateTesting = '2018-05-18 16:00:00';
        date = dateTesting;
        if (response.data['Error Message']) {
            throw new Error('Unable to find information regarding the stock');
        }
        let val = response.data['Time Series (1min)'][date];
        if (!val) {
            return console.log('Stock market is currently closed');
        }
        let highestVal = response.data['Time Series (1min)'][dateTesting]['2. high'];
        console.log(stock + ' ' + highestVal);
        res.send({stock, highestVal});
        return highestVal;
    }).catch((e) => {
        console.log(e.message);
        return res.status(404).send(e);
    });
});

app.get('/:stock', (req, res) => {
    let { stock } = req.params;
    Stock.find({_id: stock}).then((entry) => {
        console.log(JSON.stringify(entry, undefined, 2));
        res.send(entry);
    }, (err) => {
        if (err) {
             console.log('Unable to find ', err);
        }
    });
});

app.post('/', (req, res) => {
    let stock = new Stock({
        _id: req.body.name,
        targetPrice: req.body.targetPrice
    });
    let url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stock._id}&interval=1min&apikey=${key}`;
    axios.get(url).then((response) => {
        let date = moment().format('YYYY-MM-DD HH:mm:ss');
        let dateTesting = '2018-05-18 16:00:00';
        date = dateTesting;
        if (response.data['Error Message']) {
            throw new Error('Unable to find information regarding the stock');
        }
        let val = response.data['Time Series (1min)'][date];
        if (!val) {
            console.log('Stock market is currently closed');
        } else {
            let highestVal = response.data['Time Series (1min)'][dateTesting]['2. high'];
            console.log('The high value of today for' + req.body.name + ' is $' + highestVal);
            if (highestVal >= req.body.targetPrice) {
                // return res.status(404).send('The target price has already been reached. Please try a new inserting a new target value');
                throw new Error('The target price has already been reached. Please try a new inserting a new target value');
            }
        }
    }).then(() => {
        stock.save().then((docs) => {
            res.send(docs);
        }, (e) => {
            throw new Error(e);
        })
    }).catch((e) => {
        console.log('Here', e);
        return res.status(404).send(e);
    });
});

app.delete('/:stock', (req, res) => {
    let { stock } = req.params;
    Stock.findOneAndDelete(stock).then((stockDelete) => {
        if (!stockDelete) {
            return res.status(404).send();
        }
        res.send({stockDelete});
    }).catch((e) => {
        res.status(400);
    });
});


app.patch('/:stock', (req, res) => {
    let {stock} = req.params;
    let body = _.pick(req.body, ['targetPrice']);

    Stock.findByIdAndUpdate(stock, {$set: body}).then((stockUpdate) => {
        if (!stockUpdate) {
            return res.status(404).send();
        }
        res.send({stockUpdate});
    }).catch((e) => {
        res.status(404).send();
    });

})

app.listen(3000, () => {
    console.log('Server is on port 3000');
})
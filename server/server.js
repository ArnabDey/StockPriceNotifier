require('dotenv').config({path: __dirname + '/../.env'});

const axios = require('axios');
const moment = require('moment');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

let mongoose = require('./db/mongoose');
let { Stock } = require('./models/stock');
const sendsms = require('./sendsms');
let app = express();

const key = process.env.STOCK_KEY;

app.use(bodyParser.json());

app.get('/notify/:stock', (req, res) => {
    console.log('notify');
    let { stock } = req.params;
    let url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stock}&interval=1min&apikey=${key}`;
    Stock.find({}, (err, stocks) => {
        if (!err){
            return stocks;
        } else {
            throw err;
        }
    }).then((allStocks) => {
        axios.get(url).then((response) => {
            let date = moment().format('YYYY-MM-DD HH:mm:ss');
            let dateTesting = '2018-06-01 15:12:00';
            date = dateTesting; // DELETE ONLY FOR TESTING PURPOSES
            if (response.data['Error Message']) {
                throw new Error('Unable to find information regarding the stock');
            }
            let val = response.data['Time Series (1min)'][date];
            if (!val) {
                return console.log('Stock market is currently closed');
            }
            let highestVal = response.data['Time Series (1min)'][dateTesting]['2. high'];
            console.log(stock + ' ' + highestVal + ' ' + allStocks[0]['targetPrice']) ;
            if (highestVal > allStocks[0]['targetPrice']) {
                console.log('here');
                let output = `The target price, ${allStocks[2]['_id']}, has been reached, and the current price is ${highestVal}`;
                console.log(output);
                sendsms.sendMessage(output);
            }
            res.send({stock, highestVal});
            return highestVal;
        }).catch((e) => {
            console.log(e.message);
            return res.status(404).send(e);
        });
    });
});

app.get('/stop/:stock', (req, res) => {
    clearInterval(repeat);
});

app.get('/all', (req, res) => {
    Stock.find({}, function(err, stocks) {
        if (!err){
            // console.log(stocks);
            res.send(stocks);
        } else {throw err;}
    });
});

app.get('/:stock', (req, res) => {
    let { stock } = req.params;
    Stock.find({_id: stock}).then((entry) => {
        console.log(JSON.stringify(entry, undefined, 2));
        res.send(entry);
        return entry;
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
            let output = 'The high value of today for ' + req.body.name + ' is $' + highestVal + '. We will notify you when the stock reaches $' + req.body.targetPrice + '.';
            if (highestVal >= req.body.targetPrice) {
                // return res.status(404).send('The target price has already been reached. Please try a new inserting a new target value');
                throw new Error('The target price has already been reached. Please try a new inserting a new target value');
            }
            console.log(output);
            sendsms.sendMessage(output);
        }
    }).then(() => {
        stock.save().then((docs) => {
            res.send(docs);
        }, (e) => {
            return res.status(404).send(e);
        })
    }).catch((e) => {
        alert(e);
        return res.status(404).send(e);
    });
});

app.delete('/:stock', (req, res) => {
    let { stock } = req.params;
    console.log(stock);
    Stock.remove({_id: stock}).then((stockDelete) => {
        console.log(stockDelete);
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

app.listen(3001, () => {
    console.log('Server is on port 3001');
})
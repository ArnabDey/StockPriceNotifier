const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

let mongoose = require('./db/mongoose');
let { Stock } = require('./models/stock');
let app = express();


app.use(bodyParser.json());


app.get('/:stock', (req, res) => {
    let { stock } = req.params;
    Stock.find({_id: stock}).then((entry) => {
        console.log(JSON.stringify(entry, undefined, 2));
        res.send(entry);
    }, (err) => {
        if (err) {
            return console.log('Unable to find ', err);
        }
    })
});

app.post('/', (req, res) => {
    let stock = new Stock({
        _id: req.body.name,
        targetPrice: req.body.targetPrice
    });
    console.log(stock);
    stock.save().then((docs) => {
        res.send(docs);
    }, (e) => {
        res.status(400).send(e);
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
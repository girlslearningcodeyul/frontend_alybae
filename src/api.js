const alibay = require('./alibay')
const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const fs = require('fs')

app.use(bodyParser.raw({ type: "*/*" }))

app.get('/itemsBought', (req, res) => {
    let uid = req.query.uid;
    res.send(JSON.stringify(alibay.getItemsBought(uid)));
});

app.listen(4000, () => console.log('Listening on port 4000!'))

const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path')

const apiRouter = require('./Routes/router');

const port = 5000;
const app = express();

app.use(bodyparser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/api', apiRouter);

app.use(express.static(path.join(__dirname, '../build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'));
});

mongoose.connect(
    'mongodb://127.0.0.1:27017/zomato',
    //'mongodb+srv://root:abcdefgh@cluster0.ydaab.mongodb.net/zomato?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
).then(success => {
    console.log('Connectd to MongoDB');

    app.listen(port, () => {
        console.log(`Server running at port ${port}`);
    });

}).catch(error => {
    console.log(error);
});
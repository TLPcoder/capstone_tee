'use strict';
const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const login = require('./routers/login');
const auction = require('./routers/auction');
const tee_time = require('./routers/tee_time');
const user = require('./routers/user');
const payment = require('./routers/payment');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));

//preflighting
//http://stackoverflow.com/questions/11001817/allow-cors-rest-request-to-a-express-node-js-application-on-heroku
//This is amazing!
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' === req.method) {
      res.send(200);
    }
    else {
      next();
    }
});
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", function(req,res){
    res.send('hello there');
});

app.use('/login', login);
app.use('/auction', auction);
app.use('/tee_time', tee_time);
app.use('/user', user);
app.use('/payment', payment);


app.listen(PORT, function(){
    console.log('running on port' + PORT);
});

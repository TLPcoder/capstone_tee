"use strict";
const path = require('path');
const express = require('express');

module.exports = {
    app: function() {
        const app = express();
        const indexPath = path.join(__dirname, 'index.html');
        const publicPath = express.static(path.join(__dirname, 'public'));
        const bodyParser = require('body-parser');
        const login = require('./routers/login');
        const auction = require('./routers/auction');
        const tee_time = require('./routers/tee_time');
        const user = require('./routers/user');
        const payment = require('./routers/payment');
        const course = require('./routers/course');
        app.use(express.static(path.join(__dirname, 'public')));

        app.use('/public', publicPath);
        
        app.get('/', function(_, res) {
            res.sendFile(indexPath);
        });
        app.set("view engine", "ejs");
        app.use(bodyParser.urlencoded({extended: true}));

        app.use(bodyParser.json());

        app.use('/login', login);
        app.use('/auction', auction);
        app.use('/tee_time', tee_time);
        app.use('/user', user);
        app.use('/payment', payment);
        app.use('/course', course);

        return app;
    }
};

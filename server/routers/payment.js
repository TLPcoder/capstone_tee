'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/userInfo/:id', function(req,res){
    var userId = req.params.id
    knex('users')
    .innerJoin('payment', 'users.id','payment.user_id')
    .where('users.id', userId)
    .then(function(data){
        res.json(data);
    });
    console.log('sent some user info')
});
router.post('/newBid', function(req,res){
    var bider_id = req.body.bider_id;
    var auction_id = req.body.auction_id;
    var bid_amount = req.body.bid_amount * 1;
    knex('bids').insert({
        'bider_id': bider_id,
        'auction_id': auction_id,
        'bid_amount': bid_amount
    }).returning('*')
    .then(function(data){
        console.log("some data", data);
        res.json(data);
    });
});
module.exports = router;

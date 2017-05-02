'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../knex');
var sendmail = require('sendmail')();

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
    console.log(req.body)
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
        knex('users').where('users.id', bider_id)
        .innerJoin('bids', 'bids.bider_id', 'users.id')
        .innerJoin('auction', 'auction.id', 'bids.auction_id')
        .innerJoin('courses', 'courses.id', 'auction.course_id')
        .where('bids.bider_id', bider_id)
        .where('auction.id', auction_id)
        .then((user) =>{
            console.log("all user data", user);
            sendmail({
                from: 'teebaytlp@gmail.com',
                to: `trevorpellegrini@gmail.com`,
                cc: 'trevorpellegrini@gmail.com',
                subject: `You have made a bid for ${user[0].name}`,
                html: `Your bid of  $${bid_amount} was succesful!`,
            }, function(err, reply) {
                console.log(err && err.stack);
                console.dir(reply);
            });
        });
        res.json(data);
    });
});
router.post('/new/payment',function(req,res){
    console.log(req.body);
    var credit_card_number = req.body.credit_card_number;
    var user_id = req.body.user_id;
    var CVV = req.body.CVV;
    var expiration = req.body.expiration;
    knex('payment').insert({
        credit_card_number:credit_card_number,
        user_id:user_id,
        CVV:CVV,
        expiration:expiration
    }).then((data) =>{
        console.log(data);
        res.json(data);
    });
});
module.exports = router;

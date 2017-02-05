'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../knex');
const date = `${new Date().getUTCFullYear()}-${new Date().getUTCMonth()}-${new Date().getUTCDate()} 24:00:00 UTC`;
var User = require('../models/users');

router.get('/favorites/:id', function(req,res){
    var id = req.params.id;
    knex.select('users.first_name','users.last_name','users.username','courses.image','courses.zip','favorite.course_id', 'courses.name', 'auction.tee_time','favorite.user_id','auction.id', 'auction.auction_ends')
    .from('users')
    .where('users.id', id)
    .innerJoin('favorite', 'favorite.user_id', 'users.id')
    .innerJoin('courses', 'courses.id', 'favorite.course_id')
    .innerJoin('auction', 'auction.course_id', 'courses.id')
    .where('auction.auction_ends', '>',date)
    .then(function(userData){
        res.json(userData);
    }).catch(function(err){
        console.log(err);
    });
});

router.get('/bids/:id', function(req,res){
    var id = req.params.id;
    knex('users')
    .innerJoin('bids', 'bids.bider_id', 'users.id')
    .innerJoin('auction', 'auction.id', 'bids.auction_id')
    .innerJoin('courses', 'courses.id', 'auction.course_id')
    .where('users.id', id)
    .where('bids.bider_id', id)
    .where('auction.auction_ends', '>',date)
    .orderBy('bids.bid_amount', 'desc')
    .then(function(data){
        res.json(data);
    }).catch(function(err){
        console.log(err);
    });
});

router.get('/:id',function(req,res){
    var id = req.params.id;
    knex('users').where('users.id', id)
    .then(function(data){
        res.json(data);
    });
});

router.put('/update',function(req,res){
    var user_id = req.body.id;
    var password = req.body.password;
    var email = req.body.email;
    var image = req.body.image;
    var zip = req.body.zip;
    console.log(req.body);
    var updateUser = new User(password,email,image,zip);
    console.log("should be hashed", updateUser.hashed_password);
    knex('users').update({
        id: user_id,
        hashed_password: updateUser.hashed_password,
        email: email,
        image: image,
        zip: zip
    })
    .where('id', user_id)
    .returning('*')
    .then(function(data){
        console.log(data);
        res.json(data);
    });
});

module.exports = router;

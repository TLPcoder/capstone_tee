'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/favorites/:id', function(req,res){
    var id = req.params.id;
    knex.select('users.first_name','users.last_name','users.username','courses.image','courses.zip','favorite.course_id', 'courses.name', 'auction.tee_time','favorite.user_id','auction.id')
    .from('users')
    .where('users.id', id)
    .innerJoin('favorite', 'favorite.user_id', 'users.id')
    .innerJoin('courses', 'courses.id', 'favorite.course_id')
    .innerJoin('auction', 'auction.course_id', 'courses.id')
    // .innerJoin('bids', 'bids.bider_id', 'favorite.user_id')
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

module.exports = router;

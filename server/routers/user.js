'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../knex');
const date = `${new Date().getUTCFullYear()}-${new Date().getUTCMonth()}-${new Date().getUTCDate()} 24:00:00 UTC`;
var User = require('../models/users');

router.get('/favorites/:id', function(req, res) {
    var id = req.params.id;
    knex.select('users.first_name', 'users.last_name', 'users.username', 'courses.image', 'courses.zip', 'favorite.course_id', 'courses.name', 'auction.tee_time', 'favorite.user_id', 'auction.id', 'auction.auction_ends', 'auction.top_bid')
        .from('users')
        .where('users.id', id)
        .innerJoin('favorite', 'favorite.user_id', 'users.id')
        .innerJoin('courses', 'courses.id', 'favorite.course_id')
        .innerJoin('auction', 'auction.course_id', 'courses.id')
        .where('auction.auction_ends', '>', date)
        .then(function(userData) {
            res.json(userData);
        }).catch(function(err) {
            console.log(err);
        });
});

router.get('/auctions/:id',function(req,res){
    var user_id = req.params.id;
    knex("courses")
    .innerJoin('auction', 'auction.course_id', 'courses.id')
    .where('auction.owner_id',user_id)
    .where('auction.auction_ends', '>', date)
    .then((data)=>{
        console.log(data);
        res.json(data);
    });
});

router.get('/favorites/courses/:id', function(req, res) {
    var id = req.params.id;
    knex.select("*")
        .from('users')
        .where('users.id', id)
        .innerJoin('favorite', 'favorite.user_id', 'users.id')
        .innerJoin('courses', 'courses.id', 'favorite.course_id')
        .then(function(userData) {
            res.json(userData);
        }).catch(function(err) {
            console.log(err);
        });
});

// router.get('/bids/:id', function(req,res){
//     var id = req.params.id;
//     knex('users').returning('*')
//     .innerJoin('bids', 'bids.bider_id', 'users.id')
//     .innerJoin('auction', 'auction.id', 'bids.auction_id')
//     .innerJoin('courses', 'courses.id', 'auction.course_id')
//     .where('users.id', id)
//     .where('bids.bider_id', id)
//     .where('auction.auction_ends', '>',date)
//     .where('auction.top_bid', knex.raw('bids.bid_amount'))
//     .then(function(data){
//         res.json(data);
//     }).catch(function(err){
//         console.log(err);
//     });
// });
router.get('/bids/:id', function(req, res) {
    var id = req.params.id;
    console.log("hello")
    var maxBid = new Promise((resolve, reject) => {
        setTimeout(resolve, 1, knex.select('bids.bider_id', 'bids.auction_id').from('bids').max('bids.bid_amount')
            .innerJoin('auction', 'auction.id', 'bids.auction_id')
            .groupBy('bids.bider_id', 'bids.auction_id')
            .where('bids.bider_id', id));
    });

    var CourseData = new Promise((resolve, reject) => {
        setTimeout(resolve, 1, knex('auction')
            .innerJoin('courses', 'courses.id', 'auction.course_id')
            .innerJoin('bids', 'auction.id', 'bids.auction_id')
            .where('auction.auction_ends', '>', date)
            .where('bids.bider_id', id));
    });

    Promise.all([maxBid,CourseData]).then(function(data) {
        console.log("data[0]", data[0]);
        var relevantBids = [];

        for(var i = 0; i < data[1].length; i++){
            for(var k = 0; k < data[0].length; k++){
                if(data[0][k].auction_id === data[1][i].auction_id && data[0][k].max === data[1][i].bid_amount){
                    relevantBids.push(data[1][i]);
                }
            }
        }
        // console.log(relevantBids);
        res.json(relevantBids);
    }).catch(function(err) {
        console.log(err);
    });
});

router.get('/favorites/not/:id',function(req,res){
    var allCourses = new Promise((resolve, reject) => {
        setTimeout(resolve, 1, knex('courses'));
    });
    var allFavorites = new Promise((resolve, reject) => {
        setTimeout(resolve, 1, knex('users')
        .innerJoin('favorite', 'favorite.user_id', 'users.id')
        .where('users.id', req.params.id));
    });
    Promise.all([allCourses, allFavorites]).then((data) => {
        console.log(data);
        var compareArray = [];
        var resultArray = [];
        for(var k = 0; k < data[1].length; k++){
            compareArray.push(data[1][k].course_id);
        }
        for(var i = 0; i < data[0].length; i++){
            if(compareArray.indexOf(data[0][i].id) === -1){
                resultArray.push(data[0][i]);
            }
        }
        res.json(resultArray);
    });
});

router.get('/:id', function(req, res) {
    var id = req.params.id;
    knex('users').where('users.id', id)
        .then(function(data) {
            res.json(data);
        });
});

router.put('/update', function(req, res) {
    var user_id = req.body.id;
    var password = req.body.password;
    var email = req.body.email;
    var image = req.body.image;
    var zip = req.body.zip;
    console.log(req.body);
    var updateUser = new User(password, email, image, zip);
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
        .then(function(data) {
            console.log(data);
            res.json(data);
        });
});

router.post('/favorite', function(req, res) {
    console.log("hello there", req.body)
    var user_id = req.body.user_id;
    var course_id = req.body.course_id;
    knex('favorite').returning('*').insert({
        user_id: user_id,
        course_id: course_id
    }).then(function(data) {
        console.log(data);
        res.json(data);
    });
});

module.exports = router;

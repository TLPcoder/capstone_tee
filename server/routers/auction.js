"use strict";
const express = require('express');
const router = express.Router();
var knex = require('../knex');
var fetch = require('node-fetch');
const date = `${new Date().getUTCFullYear()}-${new Date().getUTCMonth()}-${new Date().getUTCDay()} 24:00:00 UTC`;

router.get('/', function(req, res) {
    knex.select('courses.name', 'courses.description', 'courses.city', 'courses.country', 'courses.state', 'auction.course_id', 'auction.tee_time', 'auction.auction_ends', 'auction.owner_id','auction.top_bid','courses.image', 'users.username', 'bids.bider_id', 'bids.bid_amount', 'bids.auction_id')
        .from('auction')
        .innerJoin('courses', 'courses.id', 'auction.course_id')
        .innerJoin('users', 'users.id', 'auction.owner_id')
        .innerJoin('bids', 'bids.auction_id', 'auction.id')
        .where('bids.bid_amount', knex.raw('auction.top_bid'))
        .where('auction.auction_ends', '>',date)
        .then(function(data) {
            res.json(data);
        });
});

router.get('/:id', function(req, res){
    var id = req.params.id;
    knex('auction')
    .innerJoin('courses', 'courses.id', 'auction.course_id')
    .where('auction.id', id)
    .where('auction.auction_ends', '>',date)
    .then(function(data){
        res.json(data);
    });
})

router.get('/course/:id', function(req,res){
    var id =req.params.id;
    knex('auction')
    .innerJoin('courses', 'courses.id', 'auction.course_id')
    .where('auction.course_id', id)
    .where('auction.auction_ends', '>',date)
    .then(function(data){
        res.json(data);
    });
});

router.get('/country/:searchCountry/', function(req,res){
    var country = req.params.searchCountry;
    knex.select('courses.name', 'courses.description', 'courses.city', 'courses.country','courses.zip', 'courses.state','auction.course_id','auction.top_bid','auction.tee_time', 'auction.auction_ends', 'auction.owner_id', 'courses.image', 'users.username', 'bids.bider_id', 'bids.bid_amount')
        .from('auction')
        .innerJoin('courses', 'courses.id', 'auction.course_id')
        .innerJoin('users', 'users.id', 'auction.owner_id')
        .innerJoin('bids', 'bids.auction_id', 'auction.id')
        .where('bids.bid_amount', knex.raw('auction.top_bid'))
        .where('auction.auction_ends', '>',date)
        .where('courses.country', country)
        .then(function(data) {
            res.json(data);
        });
});

router.get('/state/:searchCountry/', function(req,res){
    var country = req.params.searchCountry;
    knex.select('courses.name', 'courses.description', 'courses.city', 'courses.country','courses.zip','courses.state','auction.course_id','auction.top_bid', 'auction.tee_time', 'auction.auction_ends', 'auction.owner_id', 'courses.image', 'users.username', 'bids.bider_id', 'bids.bid_amount')
        .from('auction')
        .innerJoin('courses', 'courses.id', 'auction.course_id')
        .innerJoin('users', 'users.id', 'auction.owner_id')
        .innerJoin('bids', 'bids.auction_id', 'auction.id')
        .where('bids.bid_amount', knex.raw('auction.top_bid'))
        .where('auction.auction_ends', '>',date)
        .where('courses.state', country)
        .then(function(data) {
            res.json(data);
        });
});

router.get('/city/:searchCountry', function(req,res){
    var country = req.params.searchCountry;
    knex.select('courses.name', 'courses.description', 'courses.city', 'courses.country','courses.zip','courses.state','auction.course_id','auction.top_bid', 'auction.tee_time', 'auction.auction_ends', 'auction.owner_id', 'courses.image', 'users.username', 'bids.bider_id', 'bids.bid_amount')
        .from('auction')
        .innerJoin('courses', 'courses.id', 'auction.course_id')
        .innerJoin('users', 'users.id', 'auction.owner_id')
        .innerJoin('bids', 'bids.auction_id', 'auction.id')
        .where('bids.bid_amount', knex.raw('auction.top_bid'))
        .where('auction.auction_ends', '>',date)
        .where('courses.city', country)
        .then(function(data) {
            res.json(data);
        });
});

router.get('/:postalcode/:distance/', function(req, res) {
    var params = req.params;
    var zipCodeCity = [];
    var url = `http://api.geonames.org/findNearbyPostalCodesJSON?postalcode=${params.postalcode}&country=US&radius=${params.distance}&username=tlpcoder`;
    fetch(url)
        .then(data => {
            var json = data.json();
            return json;
        })
        .then(json => {
            console.log("json", json);
            json.postalCodes.forEach(function(city){
                zipCodeCity.push(city.placeName);
            });
            console.log("zip codes", zipCodeCity);
            knex.select('courses.name', 'courses.description', 'courses.city', 'courses.country','courses.zip', 'courses.state','auction.top_bid', 'auction.course_id', 'auction.tee_time', 'auction.auction_ends', 'auction.owner_id', 'courses.image', 'users.username', 'bids.bider_id', 'bids.bid_amount','bids.auction_id')
                .from('auction')
                .innerJoin('courses', 'courses.id', 'auction.course_id')
                .innerJoin('users', 'users.id', 'auction.owner_id')
                .innerJoin('bids', 'bids.auction_id', 'auction.id')
                .where('bids.bid_amount', knex.raw('auction.top_bid'))
                .where('auction.auction_ends', '>',date)
                .whereIn('courses.city', zipCodeCity)
                .then(function(data) {
                    console.log("course data", data);
                    res.json(data);
                });
        }).catch(function(err) {
            console.log(err);
        });
});

router.get('/:sort', function(req, res) {
    var sortJSON  = req.params.sort;
    knex.select('courses.name', 'courses.description', 'courses.city', 'courses.country', 'courses.state', 'auction.course_id', 'auction.tee_time', 'auction.auction_ends', 'auction.owner_id','auction.top_bid','courses.image', 'users.username', 'bids.bider_id', 'bids.bid_amount')
        .from('auction')
        .innerJoin('courses', 'courses.id', 'auction.course_id')
        .innerJoin('users', 'users.id', 'auction.owner_id')
        .innerJoin('bids', 'bids.auction_id', 'auction.id')
        .where('bids.bid_amount', knex.raw('auction.top_bid'))
        .where('auction.auction_ends', '>',date)
        .orderBy('auction.top_bid', sortJSON )
        .then(function(data) {
            res.json(data);
        });
});
//api.geonames.org/findNearbyPostalCodesJSON?postalcode=94030&country=US&radius=20&username=tlpcoder
router.get('/country/:searchCountry/:sort', function(req,res){
    var country = req.params.searchCountry;
    var sortJSON  = req.params.sort;
    knex.select('courses.name', 'courses.description', 'courses.city', 'courses.country','courses.zip', 'courses.state','auction.course_id','auction.top_bid','auction.tee_time', 'auction.auction_ends', 'auction.owner_id', 'courses.image', 'users.username', 'bids.bider_id', 'bids.bid_amount')
        .from('auction')
        .innerJoin('courses', 'courses.id', 'auction.course_id')
        .innerJoin('users', 'users.id', 'auction.owner_id')
        .innerJoin('bids', 'bids.auction_id', 'auction.id')
        .where('bids.bid_amount', knex.raw('auction.top_bid'))
        .where('auction.auction_ends', '>',date)
        .where('courses.country', country)
        .orderBy('auction.top_bid', sortJSON)
        .then(function(data) {
            res.json(data);
        });
});

router.get('/state/:searchCountry/:sort', function(req,res){
    var country = req.params.searchCountry;
    var sortJSON  = req.params.sort;
    knex.select('courses.name', 'courses.description', 'courses.city', 'courses.country','courses.zip','courses.state','auction.course_id','auction.top_bid', 'auction.tee_time', 'auction.auction_ends', 'auction.owner_id', 'courses.image', 'users.username', 'bids.bider_id', 'bids.bid_amount')
        .from('auction')
        .innerJoin('courses', 'courses.id', 'auction.course_id')
        .innerJoin('users', 'users.id', 'auction.owner_id')
        .innerJoin('bids', 'bids.auction_id', 'auction.id')
        .where('bids.bid_amount', knex.raw('auction.top_bid'))
        .where('auction.auction_ends', '>',date)
        .where('courses.state', country)
        .orderBy('auction.top_bid', sortJSON )
        .then(function(data) {
            res.json(data);
        });
});

router.get('/city/:searchCountry/:sort', function(req,res){
    var country = req.params.searchCountry;
    var sortJSON  = req.params.sort;
    knex.select('courses.name', 'courses.description', 'courses.city', 'courses.country','courses.zip','courses.state','auction.course_id','auction.top_bid', 'auction.tee_time', 'auction.auction_ends', 'auction.owner_id', 'courses.image', 'users.username', 'bids.bider_id', 'bids.bid_amount')
        .from('auction')
        .innerJoin('courses', 'courses.id', 'auction.course_id')
        .innerJoin('users', 'users.id', 'auction.owner_id')
        .innerJoin('bids', 'bids.auction_id', 'auction.id')
        .where('bids.bid_amount', knex.raw('auction.top_bid'))
        .where('auction.auction_ends', '>',date)
        .where('courses.city', country)
        .orderBy('auction.top_bid', sortJSON )
        .then(function(data) {
            res.json(data);
        });
});

router.get('/:postalcode/:distance/:sort', function(req, res) {
    var params = req.params;
    var zipCodeCity = [];
    var sortJSON = req.params.sort;
    var url = `http://api.geonames.org/findNearbyPostalCodesJSON?postalcode=${params.postalcode}&country=US&radius=${params.distance}&username=tlpcoder`;
    fetch(url)
        .then(data => {
            var json = data.json();
            return json;
        })
        .then(json => {
            console.log("json", json);
            json.postalCodes.forEach(function(city){
                zipCodeCity.push(city.placeName);
            });
            console.log("zip codes", zipCodeCity);
            knex.select('courses.name', 'courses.description', 'courses.city', 'courses.country','courses.zip', 'courses.state','auction.top_bid', 'auction.course_id', 'auction.tee_time', 'auction.auction_ends', 'auction.owner_id', 'courses.image', 'users.username', 'bids.bider_id', 'bids.bid_amount','bids.auction_id')
                .from('auction')
                .innerJoin('courses', 'courses.id', 'auction.course_id')
                .innerJoin('users', 'users.id', 'auction.owner_id')
                .innerJoin('bids', 'bids.auction_id', 'auction.id')
                .where('bids.bid_amount', knex.raw('auction.top_bid'))
                .where('auction.auction_ends', '>',date)
                .whereIn('courses.city', zipCodeCity)
                .orderBy('auction.top_bid', sortJSON )
                .then(function(data) {
                    console.log("course data", data);
                    res.json(data);
                });
        }).catch(function(err) {
            console.log(err);
        });
});

router.put('/changeBid',function(req,res){
    var newBid = req.body.newBid * 1;
    var auctionId = req.body.id;
    console.log(newBid);

    knex.select('*').from('auction')
    .where('id', auctionId)
    .update({
        'top_bid': newBid
    })
    .then(function(data){
        console.log(data);
        res.json(data);
    });
});

module.exports = router;

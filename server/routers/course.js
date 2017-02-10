"use strict";
const express = require('express');
const router = express.Router();
var knex = require('../knex');
var fetch = require('node-fetch');
const date = `${new Date().getUTCFullYear()}-${new Date().getUTCMonth()}-${new Date().getUTCDate()} 24:00:00 UTC`;

router.get('/',function(req,res){
    knex('courses').then(function(data){
        res.json(data);
    });
});

router.get('/:course_id', function(req,res){
    knex('courses').returning('*')
    .where('courses.id', req.params.course_id)
    .then((data) =>{
        res.json(data);
    }).catch((err) =>{
        console.log(err);
    });
});

router.get('/:course_id/comments', function(req,res){
    knex.select('courses.image','courses.description','courses.name','courses.address','courses.city','courses.country','courses.state','users.username','comments.comment','comments.rating','comments.course_id').from('courses')
    .innerJoin('comments', 'comments.course_id','courses.id')
    .innerJoin('users','users.id','comments.commenter_id')
    .where('courses.id', req.params.course_id)
    .then((data) =>{
        res.json(data);
    }).catch((err) =>{
        console.log(err);
    });
});

router.post('/comments', function(req,res){
    var commenter_id = req.body.commenter_id;
    var comment = req.body.comment;
    var course_id = req.body.course_id;
    var rating = req.body.rating;
    console.log(req.body);
    knex('comments').returning('*')
    .insert({
        commenter_id:commenter_id,
        comment:comment,
        course_id:course_id,
        rating:rating
    })
    .then((data) =>{
        res.json(data);
    }).catch((err) =>{
        console.log(err);
    });
});

router.get('/name/id/:id/:sort', function(req,res){
    var courseId = req.params.id;
    knex.select('auction.id','courses.name','courses.description','courses.image','courses.address','courses.city','courses.country','courses.zip','courses.state','auction.course_id','auction.top_bid','bids.auction_id').from('courses').max('bids.bid_amount')
    .returning('auction.id')
    .innerJoin('auction', 'courses.id', 'auction.course_id')
    .innerJoin('bids', 'bids.auction_id','auction.id')
    .where('courses.id', courseId)
    .where('bids.bid_amount', knex.raw('auction.top_bid'))
    .where('auction.auction_ends', '>',date)
    .orderBy('auction.top_bid', req.params.sort)
    .groupBy('auction.id','courses.name','courses.description','courses.image','courses.address','courses.city','courses.country','courses.zip','courses.state','auction.course_id','auction.top_bid','bids.auction_id')
    .then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(err);
    });
});

router.get('/country/:country',function(req,res){
    knex('courses')
    .where('country',req.params.country)
    .then(function(data){
        res.json(data);
    }).catch((err)=>{
        console.log(err);
    });
});
router.get('/state/:state',function(req,res){
    knex('courses')
    .where('state',req.params.state)
    .then(function(data){
        res.json(data);
    }).catch((err)=>{
        console.log(err);
    });
});
router.get('/city/:city',function(req,res){
    knex('courses').where('city',req.params.city)
    .then(function(data){
        res.json(data);
    }).catch((err)=>{
        console.log(err);
    });
});
router.get('/zip/:zip/:distance',function(req,res){
    var params = req.params;
    var zipCodeCity = [];
    var sortJSON = req.params.sort;
    var url = `http://api.geonames.org/findNearbyPostalCodesJSON?postalcode=${params.zip}&country=US&radius=${params.distance}&username=tlpcoder`;
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
            knex('courses')
                .whereIn('courses.city', zipCodeCity)
                .then(function(data) {
                    console.log("course data", data);
                    res.json(data);
                });
        }).catch(function(err) {
            console.log(err);
        });
});

router.post('/create',function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var address = req.body.address;
    var city = req.body.city;
    var country = req.body.country;
    var zip = req.body.zip;
    knex('courses').insert({
        name:name,
        image:image,
        description:description,
        address:address,
        city:city,
        country:country,
        zip:zip
    })
    .returning('*')
    .then((data) =>{
        console.log(data);
        res.json(data);
    });
});


module.exports = router;

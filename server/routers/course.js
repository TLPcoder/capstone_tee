"use strict";
const express = require('express');
const router = express.Router();
var knex = require('../knex');
var fetch = require('node-fetch');

router.get('/',function(req,res){
    knex('courses').then(function(data){
        res.json(data);
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

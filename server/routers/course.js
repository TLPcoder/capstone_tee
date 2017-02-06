"use strict";
const express = require('express');
const router = express.Router();
var knex = require('../knex');
var fetch = require('node-fetch');

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

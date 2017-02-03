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
});

module.exports = router;

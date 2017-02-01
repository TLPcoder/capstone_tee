"use strict";
const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt');
const User = require('../models/users');
var jwt = require('json-web-token');


router.get("/", function(req, res) {
    res.render('../views/login');
});
router.get('/logout', function(req, res) {
    res.render('../views/logout');
});

router.get('/createAccount', function(req, res) {
    res.render('../views/create_account');
});

router.post('/createAccount', function(req, res) {
    var body = req.body;
    var newUser = new User(body.first_name, body.last_name, body.username, body.email, body.password);
    newUser.passwordHash(body.password);

    knex('users').returning('*').insert({
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            username: newUser.username,
            email: newUser.email,
            hashed_password: newUser.hashed_password
        })
        .then(function(data) {
            console.log(data);
            var payload = {
                "id": data[0].id,
                "username": data[0].username,
                "name": `${data[0].first_name} ${data[0].last_name}`,
            };
            var secret = 'GOLF';
            jwt.encode(secret, payload, function(err, token) {
                if (err) {
                    console.error(err.name, err.message);
                } else {
                    console.log(token);

                    // decode
                    jwt.decode(secret, token, function(err_, decodedPayload, decodedHeader) {
                        if (err) {
                            console.error(err.name, err.message);
                        } else {
                            console.log("decodedPayload", decodedPayload, "decodedHeader", decodedHeader);
                            res.json({
                                'Access-Control-Allow-Origin': '*',
                                'Content-Type': 'multipart/form-data',
                                payload: decodedPayload,
                                decodedHeader: decodedHeader
                            });
                        }
                    });
                }
            });
        });
    // res.json(body);
});

router.get('/cookie', function(req, res) {
    res.json({
        member: true,
        id: req.cookies.id
    });
});

router.post('/login', function(req, res) {
    console.log("WHOS YOUR?!");

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    var body = req.body;
    console.log("body", body);
    console.log("cookies", req.cookies);
    if (body.password === 'password') {
        console.log("should be here for nonpasswords");
        knex('users').returning('*')
            .where({
                username: body.username,
                hashed_password: body.password
            })
            .then(function(data) {
                console.log(data);
                var payload = {
                    "id": data[0].id,
                    "username": data[0].username,
                    "name": `${data[0].first_name} ${data[0].last_name}`,
                };
                var secret = 'GOLF';
                jwt.encode(secret, payload, function(err, token) {
                    if (err) {
                        console.error(err.name, err.message);
                    } else {
                        console.log(token);

                        // decode
                        jwt.decode(secret, token, function(err_, decodedPayload, decodedHeader) {
                            if (err) {
                                console.error(err.name, err.message);
                            } else {
                                console.log("decodedPayload", decodedPayload, "decodedHeader", decodedHeader);
                                res.json({
                                    'Access-Control-Allow-Origin': '*',
                                    'Content-Type': 'multipart/form-data',
                                    payload: decodedPayload,
                                    decodedHeader: decodedHeader
                                });
                            }
                        });
                    }
                });
            });
    } else {
        knex('users')
            .returning('*')
            .where('username', body.username)
            .then(function(data) {
                var userExist = bcrypt.compareSync(body.password, data[0].hashed_password);
                if (userExist) {
                    knex('users').returning('*')
                        .where({
                            username: body.username
                        })
                        .then(function(userData) {
                            console.log(userData);
                            var payload = {
                                "id": userData[0].id,
                                "username": userData[0].username,
                                "name": `${userData[0].first_name} ${userData[0].last_name}`,
                            };
                            var secret = 'GOLF';
                            jwt.encode(secret, payload, function(err, token) {
                                if (err) {
                                    console.error(err.name, err.message);
                                } else {
                                    console.log(token);

                                    // decode
                                    jwt.decode(secret, token, function(err_, decodedPayload, decodedHeader) {
                                        if (err) {
                                            console.error(err.name, err.message);
                                        } else {
                                            console.log("decodedPayload", decodedPayload, "decodedHeader", decodedHeader);
                                            res.json({
                                                'Access-Control-Allow-Origin': 'http://localhost:8080',
                                                'Content-Type': 'multipart/form-data',
                                                payload: decodedPayload,
                                                decodedHeader: decodedHeader
                                            });
                                        }
                                    });
                                }
                            });
                        });
                } else {
                    res.json({
                        user: false
                    });
                }
            });
    }
});

router.post('/logout', function(req, res) {
    res.clearCookie('id');
    res.json({
        cookie: "deleted"
    });
    console.log("cleared your cookie");
});

module.exports = router;

"use strict";
const express = require('express');
const router = express.Router();
var knex = require('../knex');
var fetch = require('node-fetch');
var sendmail = require('sendmail')();
var schedule = require('node-schedule');
const date = `${new Date().getUTCFullYear()}-${new Date().getUTCMonth()}-${new Date().getUTCDate()} 24:00:00 UTC`;

var sendConEmailAuctioner = schedule.scheduleJob({hour: 23}, function() {
    var today = `${new Date().getUTCFullYear()}-${new Date().getUTCMonth()}-${new Date().getUTCDate()} 24:00:00 UTC`;
    knex('auction')
        .where('auction.auction_ends', today)
        .then((closedAuctions) => {
            closedAuctions.forEach((owner) => {
                knex('users').where('id', owner.owner_id)
                .then((sendEmail) => {
                    sendmail({
                        from: 'teebaytlp@gmail.com',
                        to: `${sendEmail[0].email}`,
                        cc: 'trevorpellegrini@gmail.com',
                        subject: 'Auction Ended',
                        html: `Your auction has closed`,
                    }, function(err, reply) {
                        console.log(err && err.stack);
                        console.dir(reply);
                    });
                });
            });
            closedAuctions.forEach((bider) => {
                knex('bids')
                .innerJoin('users', 'users.id', 'bids.bider_id')
                .innerJoin('auction', 'auction.id', 'bids.auction_id')
                .innerJoin('courses', 'courses.id', 'auction.course_id')
                .where('bids.bid_amount', closedAuctions.top_bid)
                .where('bids.auction_id', closedAuctions.id)
                .then((data) => {
                    console.log(data);
                    sendmail({
                        from: 'teebaytlp@gmail.com',
                        to: `${data[0].email}`,
                        cc: 'trevorpellegrini@gmail.com',
                        subject: 'Auction Ended',
                        html: `Your bid of ${data[0].bid_amount} won the auction at ${data[0].name} tee time will be at ${data[0].tee_time}`,
                    }, function(err, reply) {
                        console.log(err && err.stack);
                        console.dir(reply);
                    });
                });
            });
        });
});

router.get('/', function(req, res) {
    knex.select('courses.name', 'courses.description', 'courses.city', 'courses.country', 'courses.state', 'auction.course_id', 'auction.tee_time', 'auction.auction_ends', 'auction.owner_id', 'auction.top_bid', 'courses.image', 'users.username', 'bids.bider_id', 'bids.bid_amount', 'bids.auction_id', 'auction.course_id')
        .from('auction')
        .innerJoin('courses', 'courses.id', 'auction.course_id')
        .innerJoin('users', 'users.id', 'auction.owner_id')
        .innerJoin('bids', 'bids.auction_id', 'auction.id')
        .where('bids.bid_amount', knex.raw('auction.top_bid'))
        .where('auction.auction_ends', '>', date)
        .then(function(data) {
            res.json(data);
        });
});

router.put('/delete', function(req, res) {
    var yesterday = `${new Date().getUTCFullYear()}-${new Date().getUTCMonth()}-${new Date().getUTCDate()-1} 24:00:00 UTC`;
    console.log(yesterday);
    var auction_id = req.body.auction_id;
    knex('auction')
        .update({
            auction_ends: yesterday
        })
        .where('auction.id', auction_id)
        .then((data) => {
            console.log(data);
            res.json(data);
        });
});
router.get('/course', function(req, res) {
    knex.select('name').from('courses')
        .then(function(data) {
            res.json(data);
        });
});
router.get('/course/name/id', function(req, res) {
    knex.select('name', 'id').from('courses')
        .then(function(data) {
            var allCourses = data.map((element) => {
                return {
                    course_name: element.name,
                    course_id: element.id
                };
            });
            res.json(allCourses);
        });
});
router.get('/:id', function(req, res) {
    var id = req.params.id;
    knex('auction')
        .innerJoin('courses', 'courses.id', 'auction.course_id')
        .innerJoin('bids', 'bids.auction_id', 'auction.id')
        .where('auction.id', id)
        .where('auction.auction_ends', '>', date)
        .then(function(data) {
            res.json(data);
        });
});

router.get('/course/:id', function(req, res) {
    var id = req.params.id;
    knex('auction')
        .innerJoin('courses', 'courses.id', 'auction.course_id')
        .where('auction.course_id', id)
        .where('auction.auction_ends', '>', date)
        .then(function(data) {
            res.json(data);
        });
});

router.get('/country/:searchCountry/', function(req, res) {
    var country = req.params.searchCountry;
    knex.select('courses.name', 'courses.description', 'courses.city', 'courses.country', 'courses.zip', 'courses.state', 'auction.course_id', 'auction.top_bid', 'auction.tee_time', 'auction.auction_ends', 'auction.owner_id', 'courses.image', 'users.username', 'bids.bider_id', 'bids.bid_amount')
        .from('auction')
        .innerJoin('courses', 'courses.id', 'auction.course_id')
        .innerJoin('users', 'users.id', 'auction.owner_id')
        .innerJoin('bids', 'bids.auction_id', 'auction.id')
        .where('bids.bid_amount', knex.raw('auction.top_bid'))
        .where('auction.auction_ends', '>', date)
        .where('courses.country', country)
        .then(function(data) {
            res.json(data);
        });
});

router.get('/state/:searchCountry/', function(req, res) {
    var country = req.params.searchCountry;
    knex.select('courses.name', 'courses.description', 'courses.city', 'courses.country', 'courses.zip', 'courses.state', 'auction.course_id', 'auction.top_bid', 'auction.tee_time', 'auction.auction_ends', 'auction.owner_id', 'courses.image', 'users.username', 'bids.bider_id', 'bids.bid_amount')
        .from('auction')
        .innerJoin('courses', 'courses.id', 'auction.course_id')
        .innerJoin('users', 'users.id', 'auction.owner_id')
        .innerJoin('bids', 'bids.auction_id', 'auction.id')
        .where('bids.bid_amount', knex.raw('auction.top_bid'))
        .where('auction.auction_ends', '>', date)
        .where('courses.state', country)
        .then(function(data) {
            res.json(data);
        });
});

router.get('/city/:searchCountry', function(req, res) {
    var country = req.params.searchCountry;
    knex.select('courses.name', 'courses.description', 'courses.city', 'courses.country', 'courses.zip', 'courses.state', 'auction.course_id', 'auction.top_bid', 'auction.tee_time', 'auction.auction_ends', 'auction.owner_id', 'courses.image', 'users.username', 'bids.bider_id', 'bids.bid_amount')
        .from('auction')
        .innerJoin('courses', 'courses.id', 'auction.course_id')
        .innerJoin('users', 'users.id', 'auction.owner_id')
        .innerJoin('bids', 'bids.auction_id', 'auction.id')
        .where('bids.bid_amount', knex.raw('auction.top_bid'))
        .where('auction.auction_ends', '>', date)
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
            json.postalCodes.forEach(function(city) {
                zipCodeCity.push(city.placeName);
            });
            console.log("zip codes", zipCodeCity);
            knex.select('courses.name', 'courses.description', 'courses.city', 'courses.country', 'courses.zip', 'courses.state', 'auction.top_bid', 'auction.course_id', 'auction.tee_time', 'auction.auction_ends', 'auction.owner_id', 'courses.image', 'users.username', 'bids.bider_id', 'bids.bid_amount', 'bids.auction_id')
                .from('auction')
                .innerJoin('courses', 'courses.id', 'auction.course_id')
                .innerJoin('users', 'users.id', 'auction.owner_id')
                .innerJoin('bids', 'bids.auction_id', 'auction.id')
                .where('bids.bid_amount', knex.raw('auction.top_bid'))
                .where('auction.auction_ends', '>', date)
                .whereIn('courses.city', zipCodeCity)
                .then(function(data) {
                    console.log("course data", data);
                    res.json(data);
                });
        }).catch(function(err) {
            console.log(err);
        });
});

router.get('/sort/by/:sort', function(req, res) {
    var sortJSON = req.params.sort;
    knex.select('courses.name', 'courses.description', 'courses.city', 'courses.country', 'courses.state', 'auction.course_id', 'auction.tee_time', 'auction.auction_ends', 'auction.owner_id', 'auction.top_bid', 'courses.image', 'users.username', 'bids.bider_id', 'bids.bid_amount', 'bids.auction_id')
        .from('auction')
        .innerJoin('courses', 'courses.id', 'auction.course_id')
        .innerJoin('users', 'users.id', 'auction.owner_id')
        .innerJoin('bids', 'bids.auction_id', 'auction.id')
        .where('bids.bid_amount', knex.raw('auction.top_bid'))
        .where('auction.auction_ends', '>', date)
        .orderBy('auction.top_bid', sortJSON)
        .then(function(data) {
            res.json(data);
        });
});
//api.geonames.org/findNearbyPostalCodesJSON?postalcode=94030&country=US&radius=20&username=tlpcoder
router.get('/country/:searchCountry/:sort', function(req, res) {
    var country = req.params.searchCountry;
    var sortJSON = req.params.sort;
    knex.select('courses.name', 'courses.description', 'courses.city', 'courses.country', 'courses.zip', 'courses.state', 'auction.course_id', 'auction.top_bid', 'auction.tee_time', 'auction.auction_ends', 'auction.owner_id', 'courses.image', 'users.username', 'bids.bider_id', 'bids.bid_amount')
        .from('auction')
        .innerJoin('courses', 'courses.id', 'auction.course_id')
        .innerJoin('users', 'users.id', 'auction.owner_id')
        .innerJoin('bids', 'bids.auction_id', 'auction.id')
        .where('bids.bid_amount', knex.raw('auction.top_bid'))
        .where('auction.auction_ends', '>', date)
        .where('courses.country', country)
        .orderBy('auction.top_bid', sortJSON)
        .then(function(data) {
            res.json(data);
        });
});

router.get('/state/:searchCountry/:sort', function(req, res) {
    var country = req.params.searchCountry;
    var sortJSON = req.params.sort;
    knex.select('courses.name', 'courses.description', 'courses.city', 'courses.country', 'courses.zip', 'courses.state', 'auction.course_id', 'auction.top_bid', 'auction.tee_time', 'auction.auction_ends', 'auction.owner_id', 'courses.image', 'users.username', 'bids.bider_id', 'bids.bid_amount')
        .from('auction')
        .innerJoin('courses', 'courses.id', 'auction.course_id')
        .innerJoin('users', 'users.id', 'auction.owner_id')
        .innerJoin('bids', 'bids.auction_id', 'auction.id')
        .where('bids.bid_amount', knex.raw('auction.top_bid'))
        .where('auction.auction_ends', '>', date)
        .where('courses.state', country)
        .orderBy('auction.top_bid', sortJSON)
        .then(function(data) {
            res.json(data);
        });
});

router.get('/city/:searchCountry/:sort', function(req, res) {
    var country = req.params.searchCountry;
    var sortJSON = req.params.sort;
    knex.select('courses.name', 'courses.description', 'courses.city', 'courses.country', 'courses.zip', 'courses.state', 'auction.course_id', 'auction.top_bid', 'auction.tee_time', 'auction.auction_ends', 'auction.owner_id', 'courses.image', 'users.username', 'bids.bider_id', 'bids.bid_amount')
        .from('auction')
        .innerJoin('courses', 'courses.id', 'auction.course_id')
        .innerJoin('users', 'users.id', 'auction.owner_id')
        .innerJoin('bids', 'bids.auction_id', 'auction.id')
        .where('bids.bid_amount', knex.raw('auction.top_bid'))
        .where('auction.auction_ends', '>', date)
        .where('courses.city', country)
        .orderBy('auction.top_bid', sortJSON)
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
            json.postalCodes.forEach(function(city) {
                zipCodeCity.push(city.placeName);
            });
            console.log("zip codes", zipCodeCity);
            knex.select('courses.name', 'courses.description', 'courses.city', 'courses.country', 'courses.zip', 'courses.state', 'auction.top_bid', 'auction.course_id', 'auction.tee_time', 'auction.auction_ends', 'auction.owner_id', 'courses.image', 'users.username', 'bids.bider_id', 'bids.bid_amount', 'bids.auction_id')
                .from('auction')
                .innerJoin('courses', 'courses.id', 'auction.course_id')
                .innerJoin('users', 'users.id', 'auction.owner_id')
                .innerJoin('bids', 'bids.auction_id', 'auction.id')
                .where('bids.bid_amount', knex.raw('auction.top_bid'))
                .where('auction.auction_ends', '>', date)
                .whereIn('courses.city', zipCodeCity)
                .orderBy('auction.top_bid', sortJSON)
                .then(function(data) {
                    console.log("course data", data);
                    res.json(data);
                });
        }).catch(function(err) {
            console.log(err);
        });
});
// router.post('/create/bid', function(req,res){
//     var bider_id = req.body.bider_id;
//     var auction_id = req.body.auction_id;
//     var bid_amount = req.body.bid_amount;
//     knex('bids')
//     .insert({
//         bider_id: bider_id,
//         auction_id:auction_id,
//         bid_amount:bid_amount
//     }).then((data) => {
//         res.json(data);
//     }).catch((err) =>{
//         console.log(err);
//     });
// });

router.put('/changeBid', function(req, res) {
    var newBid = req.body.newBid * 1;
    var auctionId = req.body.id;
    console.log(newBid);

    knex.select('*').from('auction')
        .where('id', auctionId)
        .update({
            'top_bid': newBid
        })
        .then(function(data) {
            console.log(data);
            res.json(data);
        });
});

router.post('/create', function(req, res) {
    console.log(req.body);
    var course_id = req.body.course_id;
    var owner_id = req.body.owner_id;
    var top_bid = req.body.top_bid;
    var tee_time = req.body.tee_time;
    console.log('teeeeeee time', tee_time);
    var auction_ends = req.body.auction_ends;
    knex('auction').returning('*').insert({
        course_id: course_id * 1,
        owner_id: owner_id * 1,
        top_bid: top_bid * 1,
        tee_time: tee_time,
        auction_ends: auction_ends
    }).then((data) => {
        console.log("fkjsdlkfjsadklfjasl;dkfjsa;dlkfsda", data);
        res.json(data);
    });
});



module.exports = router;

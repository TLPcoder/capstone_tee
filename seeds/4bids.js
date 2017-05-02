'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('bids').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('bids').insert({
            //id: 1,
            bider_id: 3,
            auction_id:1,
            bid_amount: 80
        }),
        knex('bids').insert({
            //id: 2,
            bider_id: 2,
            auction_id:1,
            bid_amount:95
        }),
        knex('bids').insert({
            //id: 3,
            bider_id: 1,
            auction_id:3,
            bid_amount:100
        }),
        knex('bids').insert({
            //id: 4,
            bider_id: 2,
            auction_id:3,
            bid_amount: 110
        }),
        knex('bids').insert({
            //id: 5,
            bider_id: 1,
            auction_id:2,
            bid_amount:100
        }),
        knex('bids').insert({
            //id: 6,
            bider_id: 3,
            auction_id:2,
            bid_amount:80
        }),
        knex('bids').insert({
            //id: 6,
            bider_id: 4,
            auction_id:3,
            bid_amount:120
        }),
        knex('bids').insert({
            //id: 6,
            bider_id: 5,
            auction_id:2,
            bid_amount:100
        }),
        knex('bids').insert({
            //id: 6,
            bider_id: 5,
            auction_id:6,
            bid_amount:210
        }),
        knex('bids').insert({
            //id: 6,
            bider_id: 4,
            auction_id:7,
            bid_amount:200
        }),
        knex('bids').insert({
            //id: 6,
            bider_id: 8,
            auction_id:10,
            bid_amount:170
        }),
        knex('bids').insert({
            //id: 6,
            bider_id: 7,
            auction_id:5,
            bid_amount:190
        }),
        knex('bids').insert({
            //id: 6,
            bider_id: 6,
            auction_id:9,/////////////
            bid_amount:160
        }),
        knex('bids').insert({
            //id: 6,
            bider_id: 6,
            auction_id:10,/////////////
            bid_amount:140
        }),
        knex('bids').insert({
            //id: 6,
            bider_id: 8,
            auction_id:11,
            bid_amount:138
        }),
        knex('bids').insert({
            //id: 6,
            bider_id: 7,
            auction_id:12,
            bid_amount:160
        }),
        knex('bids').insert({
            //id: 6,
            bider_id: 5,
            auction_id:13,
            bid_amount:170
        }),
        knex('bids').insert({
            //id: 6,
            bider_id: 4,
            auction_id:14,
            bid_amount:160
        }),
        knex('bids').insert({
            //id: 6,
            bider_id: 2,
            auction_id:15,
            bid_amount:140
        }),
        knex('bids').insert({
            //id: 6,
            bider_id: 1,
            auction_id:16,
            bid_amount:140
        })
      ]);
    });
};

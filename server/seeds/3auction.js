'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('auction').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('auction').insert({
            //id: 1,
            course_id: 1,
            owner_id: 1,
            top_bid:95,
            tee_time: new Date('2017-03-20 8:30:00 UTC'),
            'auction_ends': new Date('2017-03-19 24:00:00 UTC')
        }),
        knex('auction').insert({
            //id: 2,
            course_id: 2,
            owner_id: 2,
            top_bid:100,
            tee_time: new Date('2017-03-21 8:30:00 UTC'),
            'auction_ends': new Date('2017-03-19 24:00:00 UTC')
        }),
        knex('auction').insert({
            //id: 3,
            course_id: 3,
            owner_id: 3,
            top_bid:120,
            tee_time: new Date('2017-03-22 8:30:00 UTC'),
            'auction_ends': new Date('2017-03-19 24:00:00 UTC')
        }),
        knex('auction').insert({
            //id: 3,
            course_id: 4,
            owner_id: 4,
            top_bid:390,
            tee_time: new Date('2017-03-22 14:30:00 UTC'),
            'auction_ends': new Date('2017-03-20 24:00:00 UTC')
        }),
        knex('auction').insert({
            //id: 3,
            course_id: 5,
            owner_id: 5,
            top_bid:190,
            tee_time: new Date('2017-03-25 6:30:00 UTC'),
            'auction_ends': new Date('2017-03-23 24:00:00 UTC')
        }),
        knex('auction').insert({
            //id: 3,
            course_id: 6,
            owner_id: 6,
            top_bid:210,
            tee_time: new Date('2017-03-25 7:30:00 UTC'),
            'auction_ends': new Date('2017-03-23 24:00:00 UTC')
        }),
        knex('auction').insert({
            //id: 3,
            course_id: 7,
            owner_id: 7,
            top_bid:200,
            tee_time: new Date('2017-03-29 9:30:00 UTC'),
            'auction_ends': new Date('2017-03-27 24:00:00 UTC')
        }),
        knex('auction').insert({
            //id: 3,
            course_id: 8,
            owner_id: 8,
            top_bid:170,
            tee_time: new Date('2017-02-22 10:30:00 UTC'),
            'auction_ends': new Date('2017-02-20 24:00:00 UTC')
        }),
        knex('auction').insert({
            //id: 3,
            course_id: 9,
            owner_id: 2,
            top_bid:160,
            tee_time: new Date('2017-02-11 8:30:00 UTC'),
            'auction_ends': new Date('2017-02-09 24:00:00 UTC')
        }),
        knex('auction').insert({
            //id: 3,
            course_id: 10,
            owner_id: 1,
            top_bid:140,
            tee_time: new Date('2017-03-22 8:30:00 UTC'),
            'auction_ends': new Date('2017-03-19 24:00:00 UTC')
        }),
        knex('auction').insert({
            //id: 3,
            course_id: 11,
            owner_id: 2,
            top_bid:138,
            tee_time: new Date('2017-03-22 8:30:00 UTC'),
            'auction_ends': new Date('2017-03-19 24:00:00 UTC')
        }),
        knex('auction').insert({
            //id: 3,
            course_id: 12,
            owner_id: 3,
            top_bid:160,
            tee_time: new Date('2017-03-22 8:30:00 UTC'),
            'auction_ends': new Date('2017-03-19 24:00:00 UTC')
        }),
        knex('auction').insert({
            //id: 3,
            course_id: 13,
            owner_id: 4,
            top_bid:170,
            tee_time: new Date('2017-03-22 8:30:00 UTC'),
            'auction_ends': new Date('2017-03-19 24:00:00 UTC')
        }),
        knex('auction').insert({
            //id: 3,
            course_id: 14,
            owner_id: 5,
            top_bid:160,
            tee_time: new Date('2017-03-22 8:30:00 UTC'),
            'auction_ends': new Date('2017-03-19 24:00:00 UTC')
        }),
        knex('auction').insert({
            //id: 3,
            course_id: 15,
            owner_id: 6,
            top_bid:140,
            tee_time: new Date('2017-03-22 8:30:00 UTC'),
            'auction_ends': new Date('2017-03-19 24:00:00 UTC')
        }),
        knex('auction').insert({
            //id: 3,
            course_id: 1,
            owner_id: 1,
            top_bid:140,
            tee_time: new Date('2017-03-22 8:30:00 UTC'),
            'auction_ends': new Date('2017-03-19 24:00:00 UTC')
        })
      ]);
    });
};

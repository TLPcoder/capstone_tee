'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({
            // id: 1,
            first_name: 'Trevor',
            last_name: 'Pellegrini',
            username: 'TPslicer',
            email: 'trevor@gmail.com',
            hashed_password: 'password',
            zip:94030,
            image:'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/8/005/090/289/3ca32fd.jpg',
            created_at: new Date('2017-01-29 14:26:16 UTC'),
            updated_at: new Date('2017-01-29 14:26:16 UTC')
        }),
        knex('users').insert({
            // id: 2,
            first_name: 'Gary',
            last_name: 'Pellegrini',
            username: 'Gary',
            email: 'gary@gmail.com',
            hashed_password: 'password',
            zip:94030,
            image: 'https://media.licdn.com/media/p/1/000/05f/2a5/3dd967a.jpg',
            created_at: new Date('2017-01-29 14:26:16 UTC'),
            updated_at: new Date('2017-01-29 14:26:16 UTC')
        }),
        knex('users').insert({
            // id: 3,
            first_name: 'Brandon',
            last_name: 'Pellegrini',
            username: 'BP',
            email: 'brandon@gmail.com',
            hashed_password: '$2a$04$jJtfAhPhc/RpbObMyQH8j.6ieN6F3nJTQHXadiMPuDl/IR5GokIqq',
            zip:94030,
            image: "http://www.racingpal.com/images/nouser.png",
            created_at: new Date('2017-01-29 14:26:16 UTC'),
            updated_at: new Date('2017-01-29 14:26:16 UTC')
        }),
        knex('users').insert({
            // id: 3,
            first_name: 'Victor',
            last_name: 'Constantino',
            username: 'VC',
            email: 'victor@gmail.com',
            hashed_password: '$2a$04$jJtfAhPhc/RpbObMyQH8j.6ieN6F3nJTQHXadiMPuDl/IR5GokIqq',
            zip:94132,
            image: "http://www.racingpal.com/images/nouser.png",
            created_at: new Date('2017-01-29 14:26:16 UTC'),
            updated_at: new Date('2017-01-29 14:26:16 UTC')
        }),
        knex('users').insert({
            // id: 3,
            first_name: 'Namkai',
            last_name: 'Fairfield',
            username: 'Namski',
            email: 'Namkai@gmail.com',
            hashed_password: '$2a$04$jJtfAhPhc/RpbObMyQH8j.6ieN6F3nJTQHXadiMPuDl/IR5GokIqq',
            zip:94015,
            image: "http://www.racingpal.com/images/nouser.png",
            created_at: new Date('2017-01-29 14:26:16 UTC'),
            updated_at: new Date('2017-01-29 14:26:16 UTC')
        }),
        knex('users').insert({
            // id: 3,
            first_name: 'Eleanor',
            last_name: 'Howard',
            username: 'Ellie Help',
            email: 'help@hurry.com',
            hashed_password: '$2a$04$jJtfAhPhc/RpbObMyQH8j.6ieN6F3nJTQHXadiMPuDl/IR5GokIqq',
            zip:94030,
            image: "http://www.racingpal.com/images/nouser.png",
            created_at: new Date('2017-01-29 14:26:16 UTC'),
            updated_at: new Date('2017-01-29 14:26:16 UTC')
        }),
        knex('users').insert({
            // id: 3,
            first_name: 'David',
            last_name: 'Shin',
            username: 'Dave',
            email: 'david@gmail.com',
            hashed_password: '$2a$04$jJtfAhPhc/RpbObMyQH8j.6ieN6F3nJTQHXadiMPuDl/IR5GokIqq',
            zip:94030,
            image: "http://www.racingpal.com/images/nouser.png",
            created_at: new Date('2017-01-29 14:26:16 UTC'),
            updated_at: new Date('2017-01-29 14:26:16 UTC')
        }),
        knex('users').insert({
            // id: 3,
            first_name: 'Rob',
            last_name: 'Conner',
            username: 'Big Rob',
            email: 'bigrob@gmail.com',
            hashed_password: '$2a$04$jJtfAhPhc/RpbObMyQH8j.6ieN6F3nJTQHXadiMPuDl/IR5GokIqq',
            zip:94030,
            image: "http://www.racingpal.com/images/nouser.png",
            created_at: new Date('2017-01-29 14:26:16 UTC'),
            updated_at: new Date('2017-01-29 14:26:16 UTC')
        }),
        knex('users').insert({
            // id: 3,
            first_name: 'Yubo',
            last_name: 'Diwu',
            username: 'YD',
            email: 'diwu@gmail.com',
            hashed_password: '$2a$04$jJtfAhPhc/RpbObMyQH8j.6ieN6F3nJTQHXadiMPuDl/IR5GokIqq',
            zip:94030,
            image: "http://www.racingpal.com/images/nouser.png",
            created_at: new Date('2017-01-29 14:26:16 UTC'),
            updated_at: new Date('2017-01-29 14:26:16 UTC')
        })
      ]);
    });
};

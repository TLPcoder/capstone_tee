'use strict';
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(table) {
        table.increments('id').primary();
        table.string('first_name').notNullable().defaultTo('');
        table.string('last_name').notNullable().defaultTo('');
        table.string('username').notNullable().unique();
        table.string('email').notNullable().unique();
        table.specificType('hashed_password', 'char(60)').notNullable();
        table.integer('zip').notNullable();
        table.string('image').notNullable().defaultTo('http://www.racingpal.com/images/nouser.png');
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('users')
    ]);
};

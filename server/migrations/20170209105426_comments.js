'use strict';
exports.up = function(knex, Promise) {
    return knex.schema.createTable('comments', function(table) {
        table.increments('id').primary();
        table.integer('course_id').unsigned().notNullable();
        table.foreign('course_id').references('id').inTable('courses').onDelete('cascade');
        table.integer('commenter_id').unsigned().notNullable();
        table.foreign('commenter_id').references('id').inTable('users').onDelete('cascade');
        table.text('comment').notNullable().defaultTo('');
        table.integer('rating');
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('comments')
    ]);
};


exports.up = function(knex, Promise) {
    return knex.schema.createTable('company', function (table) {
        table.increments();
        table.string('name').notNullable().unique();
        table.string('tdp').notNullable().unique();
        table.string('phone').nullable();
        table.string('address').nullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('company');
};
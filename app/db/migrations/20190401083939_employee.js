
exports.up = function (knex, Promise) {
    return knex.schema.createTable('employee', function (table) {
        table.increments();
        table.string('full_name').notNullable().unique();
        table.string('nik').notNullable().unique();
        table.string('nationality').defaultTo('Indonesian');
        table.string('phone').nullable();
        table.string('address').nullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('employee');
};

exports.up = function(knex) {
    return knex.schema.createTable('table4', (table)=>{
        table.increments('id');
        table.string('data');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('table4')
};


exports.up = function(knex) {
    return knex.schema.createTable('table3', (table)=>{
        table.increments('id');
        table.string('data');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('table3')
};

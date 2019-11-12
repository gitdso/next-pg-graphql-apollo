const knex = require('./knex');

module.exports = {
    getAll(tableName){
        return knex(tableName);
    }
};
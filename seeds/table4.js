exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('table4').del()
        .then(function () {
            // Inserts seed entries
            return knex('table4').insert([
                {id: 1, data: 'table4 - data001'},
                {id: 2, data: 'table4 - data002'},
                {id: 3, data: 'table4 - data003'},
                {id: 4, data: 'table4 - data004'},
                {id: 5, data: 'table4 - data005'},
            ]);
        });
};
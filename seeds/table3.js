exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('table3').del()
        .then(function () {
            // Inserts seed entries
            return knex('table3').insert([
                {id: 1, data: 'table3 - data001'},
                {id: 2, data: 'table3 - data002'},
                {id: 3, data: 'table3 - data003'},
                {id: 4, data: 'table3 - data004'},
                {id: 5, data: 'table3 - data005'},
            ]);
        });
};
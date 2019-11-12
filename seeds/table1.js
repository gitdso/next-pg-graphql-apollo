exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('table1').del()
        .then(function () {
            // Inserts seed entries
            return knex('table1').insert([
                {id: 1, data: 'table1 - data001'},
                {id: 2, data: 'table1 - data002'},
                {id: 3, data: 'table1 - data003'},
                {id: 4, data: 'table1 - data004'},
                {id: 5, data: 'table1 - data005'},
            ]);
        });
};

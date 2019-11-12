exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('table2').del()
        .then(function () {
            // Inserts seed entries
            return knex('table2').insert([
                {id: 1, data: 'table2 - data001'},
                {id: 2, data: 'table2 - data002'},
                {id: 3, data: 'table2 - data003'},
                {id: 4, data: 'table2 - data004'},
                {id: 5, data: 'table2 - data005'},
            ]);
        });
};
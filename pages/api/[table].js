const queries = require('../../db/queries');
import {ApolloServer, gql} from 'apollo-server-micro'

module.exports = (req, res) => {
    const {query: {table}} = req;

    const timestamp = new Date();
    const start = process.hrtime();
    
    queries.getAll(table).then(data => {
        const end = process.hrtime(start);
        res.json({
            table: data,
            timestamp: {
                minutes: timestamp.getMinutes(),
                seconds: timestamp.getSeconds(),
                milliseconds: timestamp.getMilliseconds()
            },
            duration: {
                seconds: end[0],
                milliseconds: Math.round(end[1]/1000000),
            }
        })
    })
};
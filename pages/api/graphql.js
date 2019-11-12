import {ApolloServer, gql} from "apollo-server-micro";

const queries = require('../../db/queries');

const typeDefs = gql`
    type Query{
        response(table: String): [Data!]!
    } 
    type Data{
        table: [Table!]!
        timestamp: Timestamp!
        duration: Duration!
    }
    type Table{
        id: Int,
        data: String,
    }
    type Timestamp{
        minutes: Int,
        seconds: Int,
        milliseconds: Int,
    }
    type Duration{
        seconds: Int,
        milliseconds: Int,
    }
`;

const resolvers = {
    Query: {
        async response(parent, args, context){
            const {table} = args;
            const timestamp = new Date();
            const start = process.hrtime();
            const res = await queries.getAll(table).then(data => {
                const end = process.hrtime(start);
                return {
                    table: data,
                    timestamp: {
                        minutes: timestamp.getMinutes(),
                        seconds: timestamp.getSeconds(),
                        milliseconds: timestamp.getMilliseconds()
                    },
                    duration: {
                        seconds: end[0],
                        milliseconds: Math.round(end[1] / 1000000),
                    }
                }
            });
            return [res]
        }
    }
};

const apolloServer = new ApolloServer({typeDefs, resolvers});

export const config = {
    api: {
        bodyParser: false
    }
};

export default apolloServer.createHandler({path: '/api/graphql'})
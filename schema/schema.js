import Data from "../components/Data";

const graphql = require('graphql');

const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLSchema} = graphql;

const DataType = new GraphQLObjectType({
    name: 'Data',
    fields: () => ({
        id: {type: GraphQLID},
        data: {type: GraphQLString},
    })
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        data: {
            type: GraphQLList(DataType),
            resolve(parent, args) {
                return [1,2,3]
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: Query
});
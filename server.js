// const express = require('express');

// const expressGraphQL = require('express-graphql').graphqlHTTP
// const {
//     GraphQLSchema,
//     GraphQLObjectType,
//     GraphQLString
// } = require('graphql')
// const app = express();

// const schema = new GraphQLSchema({
//     query: new GraphQLObjectType({
//         name:'Hello World',
//         fields: () => ({
//             message: {
//                 type: GraphQLString,
//                 resolve : () => 'Hello World'
//             }
//         })
//     })
// })

// app.use('/graphql', expressGraphQL ({
//     schema: schema,
//     graphql: true
// }))
// app.listen(5000., () => console.log('server is running'))


var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
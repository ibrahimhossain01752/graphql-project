const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { resolve } = require('path');


// const books = [
//   {id:1, name: 'Harry Potter and the number the Chamber of Secrets', authorId:1},
//   {id:2, name: 'Harry Potter and the Prisoner  of Azkaban', authorId:1},
//   {id:3, name: 'Harry Potter and the Goblet of Fire', authorId:1},
//   {id:4, name: 'The Fellowship of the Ring', authorId:2},
//   {id:5, name: 'The Two Towers', authorId:2},
//   {id:6, name: 'The Return of the King', authorId:2},
//   {id:7, name: 'The way of the Shadow', authorId:3},
//   {id:8, name: 'Beyond the Shadow', authorId:3},

// ]

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
    welcomeMessage(name: String, dayofweek: String!): String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
 hello:() => {
  return 'Hello World'
 },
 welcomeMessage:(args) => {
  console.log(args);
  return `Hey ${args.name} hows life, today is ${args.dayofweek}`;
 }
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
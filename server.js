const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { resolve } = require('path');
const axios = require('axios');


let message = "This is a message"

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`

type Post {
  userId: Int
  id: Int
  title: String
  body: String
}

type User {
  name: String
  age: Int
  college: String
}

type Query {
    hello: String
    welcomeMessage(name: String, dayofweek: String!): String
    getUser: User
    getUsers:[User]
    getPostFromExternalAPI: [Post]
    message: String
  }

  input UserInput {
    name: String!
    age: Int!
    college: String!
  }

  type Mutation {
    setMessage(newMessage: String): String
    createUser(user: UserInput) : User
  }

`);
//createUser(name: String!, age: Int!, college: String!) : User



// The root provides a resolver function for each API endpoint
const root = {
 hello:() => {
  return 'Hello World'
 },
 welcomeMessage:(args) => {
  console.log(args);
  return `Hey ${args.name} hows life, today is ${args.dayofweek}`;
 },
 getUser: () => {
  const user = {
    name: 'Ibrahim Hossain',
    age: 21,
    college:'AHC'
  }
  return user;
 },
 getUsers : () => {
 const users = [
  {
    name: 'Homyra',
    age: 16,
    college:'Girls'
  },
  {
    name: 'Shimaa',
    age: 26,
    college:'dhaka'
  }
 ]
 return users;
 },
//  getPostFromExternalAPI: () => {
//    return axios.get('https://jsonplaceholder.typicode.com/posts')
//     .then(result => result.data);
//  }

getPostFromExternalAPI: async () => {
  const result = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return result.data;
},

setMessage: ({newMessage}) => {
  message = newMessage;
  return message
},

message: () => message,
createUser: (args) => {
  console.log(args)
  //{name, age, college}
    //create a new user inside or external api or even firestore
    return args.user;
    //{name, age, college}
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
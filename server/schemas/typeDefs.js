const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type Image {
    _id: String
    name: String    
    url: String
  }


  type Event {
    _id: ID
    name: String
    url: String
    images: [Image]    
  }

  type Order {
    _id: ID
    purchaseDate: String
    event: [Event]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    event(category: ID, name: String): [Event]
    user: User
    order(_id: ID!): Order
    checkout(event: [ID]!): Checkout
    events(term: String): [Event]
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(event: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateEvent(_id: ID!, quantity: Int!): Event
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;

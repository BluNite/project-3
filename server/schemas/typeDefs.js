const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type Events {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
  }

  type Order {
    _id: ID
    purchaseDate: String
    event: [Events]
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
    event(category: ID, name: String): [Events]
    event(_id: ID!): Events
    user: User
    order(_id: ID!): Order
    checkout(event: [ID]!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(event: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateEvent(_id: ID!, quantity: Int!): Events
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;

import { gql } from '@apollo/client';

export const QUERY_EVENTS = gql`
  query events($term: String) {
    events(term: $term){
      _id
      name
      url
      price_range
      images {
        name
        url
        _id
      }       
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($event: [ID]!) {
    checkout(event: $event) {
      session
    }
  }
`;


export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        event {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;

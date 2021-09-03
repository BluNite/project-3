import { gql } from '@apollo/client';

export const QUERY_EVENTS = gql`
  query getEvents($term: ID) {
    getEvents(term: $term) {
      events: {
        _id
        name
        description
        price
        quantity
        image
        category {
          _id
        }
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

// export const QUERY_ALL_EVENTS = gql`
//   {
//     event {
//       _id
//       name
//       description
//       price
//       quantity
//       category {
//         name
//       }
//     }
//   }
// `;

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

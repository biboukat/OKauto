import gql from 'graphql-tag';

const GET_HERO_BY_ID = gql`
  query Character($id: ID!) {
    character(id: $id) {
      id
      name
      location {
        name
      }
      image
    }
  }
`;

export default {GET_HERO_BY_ID};

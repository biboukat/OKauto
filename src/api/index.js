import gql from 'graphql-tag';

const GET_HERO_BY_ID = gql`
  query Character($id: ID!) {
    character(id: $id) {
      id
      name
      gender
      type
      species
      location {
        name
      }
      image
    }
  }
`;

const GET_EPISODES = gql`
  query Episodes($page: Int!) {
    episodes(page: $page) {
      info {
        count
        pages
        next
      }
      results {
        name
        id
        air_date
      }
    }
  }
`;

export default {GET_HERO_BY_ID, GET_EPISODES};

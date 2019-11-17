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

const GET_EPISODE_BY_ID = gql`
  query Episode($id: ID!) {
    episode(id: $id) {
      id
      name
      air_date
      episode
      characters {
        name
        id
      }
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

export default {GET_HERO_BY_ID, GET_EPISODES, GET_EPISODE_BY_ID};

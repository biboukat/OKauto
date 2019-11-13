import React from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';

// TODO: Remove this HACK while it is not more need
// HACK: Crash on press
import 'react-native-gesture-handler';

import App from './App';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql/',
});

export default () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

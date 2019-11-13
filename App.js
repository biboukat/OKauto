import React, {Component} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
// import {ApolloClient} from 'apollo-client';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql/',
});

class MyRootComponent extends Component {
  render() {
    return (
      <SafeAreaView>
        <View>
          <Text>{'afd'}</Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default () => (
  <ApolloProvider client={client}>
    <MyRootComponent />
  </ApolloProvider>
);

import React from 'react';
import {View, FlatList, StyleSheet, ActivityIndicator} from 'react-native';
import Item from './components/Item';
import {useQuery} from '@apollo/react-hooks';

import api from '~/api';

const renderItem = ({item: {id, name, air_date}}) => (
  <Item id={id} name={name} air_date={air_date} />
);

const renderFooter = isLoadingMore => () =>
  isLoadingMore ? (
    <View style={styles.footer}>
      <ActivityIndicator size={'large'} />
    </View>
  ) : null;

const renderSeparator = () => <View style={styles.separator} />;

export default function() {
  const {
    data: {episodes: {results, info}} = {episodes: {results: [], info: {}}},
    loading,
    error,
    refetch,
    fetchMore,
  } = useQuery(api.GET_EPISODES, {
    variables: {
      page: 1,
    },
  });

  const getMoreData = () => {
    if (info.next) {
      fetchMore({
        updateQuery: (
          {episodes: prevEpisodes},
          {fetchMoreResult: {episodes: newEpisodes}},
        ) => {
          return {
            episodes: {
              info: {...newEpisodes.info},
              results: [...prevEpisodes.results, ...newEpisodes.results],
              __typename: 'Episodes',
            },
          };
        },
        variables: {page: info.next},
      });
    }
  };

  console.log('bla loading', loading);
  console.log('bla results.length', results.length);
  return (
    <FlatList
      contentContainerStyle={styles.container}
      renderItem={renderItem}
      data={results}
      ItemSeparatorComponent={renderSeparator}
      onRefresh={refetch}
      refreshing={loading}
      onEndReached={getMoreData}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter(loading && results.length)}
      initialNumToRender={20}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  separator: {
    height: 20,
  },
  footer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

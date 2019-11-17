import React from 'react';
import {View, FlatList, StyleSheet, ActivityIndicator} from 'react-native';
import Item from './components/Item';
import {useQuery, useLazyQuery} from '@apollo/react-hooks';

import api from '~/api';

const renderItem = onPress => ({item: {id, name, air_date}}) => (
  <Item id={id} name={name} air_date={air_date} onPress={onPress} />
);

const renderFooter = isLoadingMore => () =>
  isLoadingMore ? (
    <View style={styles.footer}>
      <ActivityIndicator size={'large'} />
    </View>
  ) : null;

const renderSeparator = () => <View style={styles.separator} />;

export default function({navigation}) {
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

  const [
    getEpisodeById,
    {data: singleEpisodeData = {episode: {}}, loading: singleEpisodeLoading},
  ] = useLazyQuery(api.GET_EPISODE_BY_ID, {
    onCompleted: data => {
      navigation.navigate('EpisodeInfo', {data});
    },
  });

  const onEpisodePress = id => {
    if (id === singleEpisodeData.episode.id) {
      navigation.navigate('EpisodeInfo', {data: singleEpisodeData});
    }
    getEpisodeById({variables: {id}});
  };

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

  return (
    <View>
      <FlatList
        contentContainerStyle={styles.container}
        renderItem={renderItem(onEpisodePress)}
        data={results}
        ItemSeparatorComponent={renderSeparator}
        onRefresh={refetch}
        refreshing={loading}
        onEndReached={getMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter(loading && results.length)}
        initialNumToRender={20}
      />

      {singleEpisodeLoading ? (
        <View style={styles.spiner}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : null}
    </View>
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
  spiner: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(255,255,255,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

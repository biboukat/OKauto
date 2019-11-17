import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useLazyQuery} from '@apollo/react-hooks';
import lodashGet from 'lodash/get';

import api from '~/api';

const renderHeader = (name, air_date, episode) => () => (
  <View style={styles.info}>
    <Text style={styles.black}>{`name - ${name}`}</Text>
    <Text style={styles.grey}>{`air_date - ${air_date}`}</Text>
    <Text style={styles.black}>{`episode - ${episode}`}</Text>
  </View>
);
const renderItem = onPress => ({item: {name, id}}) => {
  console.log('bla onPress', onPress);
  return (
    <TouchableOpacity style={styles.item} onPress={onPress(id)}>
      <Text style={styles.itemText}>{name}</Text>
    </TouchableOpacity>
  );
};
export default function EpisodeDetails({navigation}) {
  const data = navigation.getParam('data', {});
  if (!data.episode) {
    navigation.goBack();
  }

  const [getHero, {loading, data: heroData}] = useLazyQuery(
    api.GET_HERO_BY_ID,
    {
      onCompleted: bla => {
        navigation.navigate('CharacterInfo', {data: bla});
      },
      onError: e => {
        alert(e);
      },
      returnPartialData: true,
    },
  );

  const onPress = id => () => {
    console.log('bla here', id);
    if (lodashGet(heroData, 'character.id', null) === id) {
      navigation.navigate('CharacterInfo', {data: heroData});
    } else {
      getHero({variables: {id}});
    }
  };

  const {name, air_date, episode, characters} = data.episode;

  return (
    <View style={{flex: 1}}>
      <FlatList
        contentContainerStyle={styles.container}
        renderItem={renderItem(onPress)}
        data={characters}
        ListHeaderComponent={renderHeader(name, air_date, episode)}
      />

      {loading ? (
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
  info: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#002323',
  },
  black: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    padding: 4,
  },
  grey: {
    backgroundColor: '#232323',
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    padding: 4,
  },
  item: {
    padding: 4,
    backgroundColor: 'cyan',
    marginBottom: 10,
  },
  itemText: {
    fontSize: 22,
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

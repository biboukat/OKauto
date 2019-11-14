import React from 'react';
import {View, StyleSheet, Image, Text, ScrollView} from 'react-native';

export default function CharacterDetails({navigation}) {
  const data = navigation.getParam('data', {});
  if (!data.character) {
    navigation.goBack();
  }
  console.log('bla data.character', data.character);

  const {image, name, gender, type, species} = data.character;

  return (
    <ScrollView style={styles.container}>
      <Image source={{uri: image}} style={styles.image} />

      <View style={styles.info}>
        <Text>{`name - ${name}`}</Text>

        <Text>{`gender - ${gender}`}</Text>

        <Text>{`type - ${type}`}</Text>

        <Text>{`species - ${species}`}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
  },
  info: {
    marginTop: 16,
  },
});

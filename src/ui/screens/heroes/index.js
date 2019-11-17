import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import {useLazyQuery} from '@apollo/react-hooks';
import lodashGet from 'lodash/get';

import api from '~/api';

export default function Heroes({navigation}) {
  const [value, onChangeText] = useState('');
  const [getHero, {loading, data}] = useLazyQuery(api.GET_HERO_BY_ID, {
    onCompleted: onCompleteData => {
      navigation.navigate('CharacterInfo', {data: onCompleteData});
    },
    onError: e => {
      alert(e);
    },
    returnPartialData: true,
  });

  const findHero = () => {
    if (lodashGet(data, 'character.id', null) === value) {
      navigation.navigate('CharacterInfo', {data});
    } else {
      getHero({variables: {id: value}});
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Text style={styles.title}>{'Find your hero by id'}</Text>

          <TextInput
            onChangeText={onChangeText}
            value={value}
            style={styles.input}
            autoCapitalize={'none'}
            onSubmitEditing={findHero}
            returnKeyType={'search'}
            keyboardType={'numeric'}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={findHero}>
              <Text style={styles.buttonText}>{'Find'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>

      {loading ? (
        <View style={styles.spiner}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {flex: 1},
  container: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: 20,
    alignSelf: 'center',
  },
  input: {
    borderWidth: 2,
    borderColor: 'blue',
    width: '100%',
    height: 50,
    padding: 8,
    marginVertical: 16,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
  },
  spiner: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

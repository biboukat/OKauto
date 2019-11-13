import React, {Component} from 'react';
import {View, Text, SafeAreaView, TextInput, StyleSheet} from 'react-native';

export default class index extends Component {
  state = {
    heroId: '',
  };

  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.title}>{'Find your hero by id'}</Text>
          <TextInput />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    alignSelf: 'center',
  },
});

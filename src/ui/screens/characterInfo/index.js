import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, ScrollView} from 'react-native';

export default class ChracterInfo extends Component {
  constructor(props) {
    super(props);
    const data = props.navigation.getParam('data', {});
    if (!data.character) {
      props.navigation.goBack();
    }

    this.state = {
      data,
    };
  }
  render() {
    const {image, name, gender, type, species} = this.state.data.character;

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

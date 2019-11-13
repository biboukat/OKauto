import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView>
        <View>
          <Text> episodes </Text>
        </View>
      </SafeAreaView>
    );
  }
}

import React, {PureComponent} from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export default class Item extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    air_date: PropTypes.string.isRequired,
  };

  _onPress = () => {
    const {id, onPress} = this.props;
    onPress(id);
  };

  render() {
    const {name, air_date} = this.props;

    return (
      <TouchableOpacity style={styles.container} onPress={this._onPress}>
        <Text style={styles.name}>{name}</Text>

        <Text>{air_date}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 4,
    borderRadius: 4,
  },

  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});

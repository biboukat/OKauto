import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

export default function Heroes() {
  const [value, onChangeText] = useState('');

  const handleFind = () => {
    console.log('bla value', value);
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
            onSubmitEditing={handleFind}
            returnKeyType={'search'}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleFind}>
              <Text style={styles.buttonText}>{'Find'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
});

import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

const Input = props => {
  return (
    <TextInput {...props} keyboardType='number-pad' style={{...styles.input, ...props.style}} />
  )
};

const styles = StyleSheet.create({
  input: {
    height: 30,
    width: 50,
    borderBottomColor: Colors.grey,
    borderBottomWidth: 1,
    marginVertical: 10
  }
});

export default Input;
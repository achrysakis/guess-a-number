import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';

const StartGameScreen = props => {
  const [enteredValue, setEnteredValue] = useState('')
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  }

  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  }

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('Invalid Number!', 'Number has to be a number between 1 and 99.', 
      [{
        text: 'Okay', 
        style: 'destructive',
        onPress: resetInputHandler
      }])
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue('');
  }

  let confirmedOutput;
  if (confirmed){
    confirmedOutput = 
      <Card style={styles.summaryContainer}>
        <Text>You selected:</Text>
        <NumberContainer>
          {selectedNumber}
        </NumberContainer>
        <View style={styles.button}>
          <Button 
            title='Start Game!' 
            color={Colors.fonts.headings} 
            onPress={() => props.onStartGame(selectedNumber)} 
          />
        </View>
      </Card>;
  }

  return (
    <TouchableWithoutFeedback 
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Card style={styles.inputContainer}>
          <Text style={styles.title}>Select a number</Text>
          <Input style={styles.input} 
                blurOnSubmit 
                autoCapitalize='none' 
                autoCorrect={false} 
                keyboardType='number-pad' 
                value={enteredValue}
                onChangeText={numberInputHandler}
          />
          <View style={styles.buttonContainer}>
            <View style={{...styles.button, ...styles.buttonReset}}>
              <Button title='Reset' color={Colors.fonts.headings} onPress={resetInputHandler} />
            </View>
            <View style={styles.button}>
              <Button title='Confirm' color={Colors.fonts.headings} onPress={confirmInputHandler} />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
  },
  inputContainer: {
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: "100%",
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  button: {
    width: "40%",
    backgroundColor: Colors.primary,
  },
  buttonReset: {
    backgroundColor: Colors.accent
  },
  input: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    textAlign: 'center',
    marginVertical: 40,
    fontSize: 44,
    height: 50,
    width: 100
  },
  summaryContainer: {
    marginVertical: 20,
    alignItems: 'center'
  }
});

export default StartGameScreen;
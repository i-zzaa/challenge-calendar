import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  updateButton: {
    backgroundColor: '#2E66E7',
    height: 40,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 40,
    borderRadius: 5,
    justifyContent: 'center',
    marginRight: 20,
    padding: 10,
  },
  updateTask: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
  },
});

const ActButton = ({ onPress, style = null, title, testID, disabled = false }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      testID={testID}
      onPress={onPress}
      style={style?.updateButton || styles.updateButton}>
      <Text style={style?.updateTask || styles.updateTask}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ActButton;

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  time: {
    height: 25,
    marginTop: 3,
    fontSize: 19,
  },
  text: {
    color: '#9CAAC4',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
});

const Times = ({ onPress, value, onValueChange, time, style = null }) => {
  return (
    <View>
      <Text style={style?.text || styles.text}>Times</Text>
      <TouchableOpacity
        testID="time-task"
        onPress={onPress}
        value={value}
        onValueChange={(time) => onValueChange(time)}
        style={style?.time || styles.time}>
        <Text>{time}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Times;

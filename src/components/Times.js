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

const Times = ({ onPress, time, style = null }) => {
  return (
    <View>
      <Text style={style?.text || styles.text}>Times</Text>
      <TouchableOpacity
        testID="time-task"
        onPress={onPress}
        style={style?.time || styles.time}>
        <Text testID="text-time-task">{time}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Times;

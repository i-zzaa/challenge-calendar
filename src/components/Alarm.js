import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  alarm: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
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

const Alarm = ({ alarm, value = false, onValueChange, style = null }) => {
  return (
    <View style={style?.alarm || styles.alarm}>
      <View>
        <Text style={style?.text || styles.text}>Alarm</Text>
        <View style={style?.time || styles.time}>
          <Text>{alarm}</Text>
        </View>
      </View>
      <Switch testID="alarm-task" value={value} onValueChange={onValueChange} />
    </View>
  );
};

export default Alarm;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  weather: {
    fontSize: 18,
    textAlign: 'left',
    color: '#afafaf',
    margin: 3,
  },
  text: {
    color: '#9CAAC4',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
});

const Weather = ({ description, temp, style = null }) => {
  return (
    <View>
      <Text style={style?.text || styles.text}>Weather</Text>
      <Text testID="description-task" style={style?.weather || styles.weather}>{`Description: ${description}`}</Text>
      <Text testID="temp-task"  style={style?.weather || styles.weather}>{`Temp: ${temp}º`}</Text>
    </View>
  );
};

export default Weather;

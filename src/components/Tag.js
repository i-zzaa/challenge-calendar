import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  red: {
    height: 30,
    width: '24%',
    marginBottom: 10,
    backgroundColor: '#ff6347',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 5,
  },
  blue: {
    height: 30,
    width: '24%',
    marginBottom: 10,
    backgroundColor: '#62CCFB',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 5,
  },
  green: {
    height: 30,
    width: '24%',
    marginBottom: 10,
    backgroundColor: '#4CD565',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 5,
  },
  random: {
    height: 30,
    width: '24%',
    marginBottom: 10,
    backgroundColor: `rgb(${Math.floor(Math.random() * Math.floor(256))},${Math.floor(
      Math.random() * Math.floor(256)
    )},${Math.floor(Math.random() * Math.floor(256))})`,
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 50,
  },
  tag: { textAlign: 'center', fontSize: 14 },
  containerTag: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  text: {
    color: '#9CAAC4',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
});

const Tag = ({ onPress, style = null }) => {
  return (
    <View>
      <Text style={style?.text || styles.text}>Tag</Text>
      <View style={style?.containerTag || styles.containerTag} testID="container-tag-task">
        <TouchableOpacity
          testID="tag-green-task"
          onPress={() => onPress('green')}
          style={style?.green || styles.green}>
          <Text style={style?.tag || styles.tag}>Green</Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID="tag-blue-task"
          onPress={() => onPress('blue')}
          style={style?.blue || styles.blue}>
          <Text style={style?.tag || styles.tag}>Blue</Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID="tag-red-task"
          onPress={() => onPress('red')}
          style={style?.red || styles.red}>
          <Text style={style?.tag || styles.tag}>Red</Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID="tag-random-task"
          onPress={() =>
            onPress(
              `rgb(${Math.floor(Math.random() * Math.floor(256))},${Math.floor(
                Math.random() * Math.floor(256)
              )},${Math.floor(Math.random() * Math.floor(256))})`
            )
          }
          style={style?.random || styles.random}>
          <Text style={style?.tag || styles.tag}>Random</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Tag;

import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  title: {
    height: 25,
    borderColor: '#5DD976',
    borderLeftWidth: 1,
    paddingLeft: 8,
    fontSize: 19,
    marginBottom: 5,
    marginTop: 20,
  },
  text: {
    color: '#9CAAC4',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
});

const TextInputCustomize = ({
  style = null,
  testID,
  title,
  onChangeText,
  value,
  placeholder,
  maxLength,
  ...props
}) => {
  return (
    <View>
      <Text style={style?.text || styles.text}>{title}</Text>

      <TextInput
        testID={testID}
        style={style?.title || styles.title}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        {...props}
      />
    </View>
  );
};

export default TextInputCustomize;

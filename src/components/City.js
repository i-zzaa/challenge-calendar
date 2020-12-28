import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {
    color: '#9CAAC4',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
});

const City = ({ selectedValue, onValueChange, pickerCity = [], style = null }) => {
  return (
    <View>
      <Text style={style?.text || styles.text}>City</Text>
      <Picker
        testID="city-task"
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => onValueChange(itemValue, itemIndex)}>
        <Picker.Item label="Selecione" value="selecione" />
        {pickerCity.map((_city) => (
          <Picker.Item key={_city.id} label={_city.name} value={_city.name} />
        ))}
      </Picker>
    </View>
  );
};

export default City;

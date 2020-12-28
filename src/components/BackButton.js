import React from 'react';
import { TouchableOpacity, Image, Dimensions } from 'react-native';
const { width: vw } = Dimensions.get('window');

const BackButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      testID="back-task"
      style={{ marginRight: vw / 2 - 120, marginLeft: 20 }}>
      <Image
        style={{ height: 25, width: 40 }}
        source={require('../../assets/back.png')}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default BackButton;

import React from 'react';
import { TouchableOpacity , Image} from 'react-native';

const ButtonCreateTask = ({onPress, styles}) => {
  return(
    <TouchableOpacity
    testID="create-task"
     onPress={onPress}
     style={styles?.viewTask}>
    <Image source={require('../../assets/plus.png')} style={styles?.plus} />
  </TouchableOpacity>
  );
}

export default ButtonCreateTask;
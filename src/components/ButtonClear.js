import React from 'react';
import { View , TouchableOpacity, Button} from 'react-native';


const ButtonClear = ({onPress, disabled = false}) => {
  return    (
    <View>
    <TouchableOpacity>
      <Button
        testID="clear-task"
        title="Clean All"
        disabled={disabled}
        onPress={onPress}
      />
    </TouchableOpacity>
  </View>
  )
;
}

export default ButtonClear;
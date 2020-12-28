import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper')


import uuid from 'uuid';
jest.spyOn(uuid, 'v4').mockReturnValue('hjhj87878');

import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()


const React = require('react')
const ReactNative = require('react-native')

const Switch = function(props) {
  const [value, setValue] = React.useState(props.value)

  return (
    <ReactNative.TouchableOpacity
      onPress={() => {
        props.onValueChange(!value)
        setValue(!value)
      }}
      testID={props.testID}>
      <ReactNative.Text>{value.toString()}</ReactNative.Text>
    </ReactNative.TouchableOpacity>
  )
}

Object.defineProperty(ReactNative, 'Switch', {
  get: function() {
    return Switch
  }
})

jest.mock('@react-native-picker/picker', () => {
  const React = require('react')
  const RealComponent = jest.requireActual('@react-native-picker/picker')

  class Picker extends React.Component {
    static Item = ( props) => {
      return React.createElement('Item', props, props.children)
    }

    render () {
      return React.createElement('Picker', this.props, this.props.children)
    }
  }

  Picker.propTypes = RealComponent.propTypes
  return {
    Picker
  }
})

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});
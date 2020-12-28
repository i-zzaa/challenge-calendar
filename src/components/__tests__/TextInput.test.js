import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import TextInput from '../TextInput';

test('should render input text', async () => {
  const onChangeText = jest.fn();

  const { getByTestId } = render(
    <TextInput
      testID="text-input"
      placeholder="test-placeholder"
      maxLength={30}
      onChangeText={onChangeText}
    />
  );

  const inputText = getByTestId('text-input');

  fireEvent.changeText(inputText, 'test-text');
  expect(onChangeText).toHaveBeenCalledWith('test-text');
  expect(inputText.props.maxLength).toEqual(30);
  expect(inputText.props.placeholder).toEqual('test-placeholder');
});

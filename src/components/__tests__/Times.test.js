import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import Times from '../Times';

test('should render times', async () => {
  const onPress = jest.fn();
  const onValueChange = jest.fn();

  const { getByTestId } = render(
    <Times time="13:00 PM" onPress={onPress} onValueChange={onValueChange} />
  );

  const inputText = getByTestId('time-task');

  fireEvent.press(inputText);
  expect(onPress).toHaveBeenCalled();

  fireEvent(inputText, 'onValueChange', '14:00 PM');

  expect(onValueChange).toHaveBeenCalled();
  expect(onValueChange).toHaveBeenCalledWith('14:00 PM');
});

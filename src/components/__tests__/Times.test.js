import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import Times from '../Times';

test('should render times', async () => {
  const onPress = jest.fn();
  const onValueChange = jest.fn();

  const { getByTestId } = render(
    <Times time="13:00 PM" onPress={onPress} />
  );

  const inputText = getByTestId('time-task');

  fireEvent.press(inputText);
  expect(onPress).toHaveBeenCalled();
});

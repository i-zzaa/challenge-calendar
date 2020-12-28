import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import Tag from '../Tag';

test('should render tags', async () => {
  const onPress = jest.fn();

  const { getByTestId } = render(<Tag onPress={onPress} />);

  const tagGreenButton = getByTestId('tag-green-task');
  fireEvent.press(tagGreenButton);
  expect(onPress).toHaveBeenCalled();

  const tagRedButton = getByTestId('tag-red-task');
  fireEvent.press(tagRedButton);
  expect(onPress).toHaveBeenCalled();

  const tagblueButton = getByTestId('tag-blue-task');
  fireEvent.press(tagblueButton);
  expect(onPress).toHaveBeenCalled();

  const tagRandomButton = getByTestId('tag-random-task');
  fireEvent.press(tagRandomButton);
  expect(onPress).toHaveBeenCalled();
});

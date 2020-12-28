import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import ActButton from '../ActButton';

test('should render the tag buttons', async () => {
  const onPress = jest.fn();

  const { getByTestId, getByText } = render(
    <ActButton onPress={onPress} testID="test" title="Test" />
  );

  const actButton = getByTestId('test');
  fireEvent.press(actButton);
  expect(onPress).toHaveBeenCalled();

  const title = getByText('Test');
  expect(title).toBeTruthy();
});

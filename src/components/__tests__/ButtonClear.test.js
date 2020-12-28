import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import ButtonClear from '../ButtonClear';

test('should render clear button', async () => {
  const onPress = jest.fn();

  const { getByTestId } = render(<ButtonClear onPress={onPress} />);

  const actButton = getByTestId('clear-task');
  fireEvent.press(actButton);
  expect(onPress).toHaveBeenCalled();
});

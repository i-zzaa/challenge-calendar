import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import BackButton from '../BackButton';

test('should render back button', async () => {
  const onPress = jest.fn();

  const { getByTestId } = render(<BackButton onPress={onPress} />);

  const actButton = getByTestId('back-task');
  fireEvent.press(actButton);
  expect(onPress).toHaveBeenCalled();
});

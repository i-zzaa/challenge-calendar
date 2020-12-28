import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import ButtonCreateTask from '../ButtonCreateTask';

test('should render create task  button', async () => {
  const onPress = jest.fn();

  const { getByTestId } = render(<ButtonCreateTask onPress={onPress} />);

  const actButton = getByTestId('create-task');
  fireEvent.press(actButton);
  expect(onPress).toHaveBeenCalled();
});

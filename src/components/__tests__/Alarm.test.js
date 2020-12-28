import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import Alarm from '../Alarm';

test('should render alarm', async () => {
  const onValueChange = jest.fn();

  const { getByTestId, getByText } = render(
    <Alarm onValueChange={onValueChange}  alarm="3:15 PM" />
  );

  const alarm = getByText('3:15 PM');
  expect(alarm).toBeTruthy();

  const alarmChange = getByTestId('alarm-task');
  fireEvent(alarmChange, 'onValueChange', true)

  expect(onValueChange).toHaveBeenCalled();
});


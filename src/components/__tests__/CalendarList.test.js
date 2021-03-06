import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import {  dateTest }from '../../utils/__mocks__/selectedTask' 

import CalendarList from '../CalendarList';

test('should render calendar list', async () => {
  const onDayPress = jest.fn();
  const date = dateTest;
  const selectedDay = {
    [date]: {
      selected: true,
      selectedColor: '#2E66E7',
    },
  };

  const { getByTestId } = render(
    <CalendarList onDayPress={onDayPress} date={date} selectedDay={selectedDay} />
  );

  const actButton = getByTestId('calendar-list-task');
  fireEvent(actButton, 'onDayPress', { dateString: dateTest })
  
  expect(onDayPress).toHaveBeenCalled();
});
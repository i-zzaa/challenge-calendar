import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { selectedTaskMock }from '../../utils/__mocks__/selectedTask' 

import Task from '../Task';


jest.mock('moment', () => () => ({format: () => '2020-12-12'}));

test('should render task', async () => {
  const onPress = jest.fn();

  const { getByTestId, getByText } = render(<Task onPress={onPress} item={selectedTaskMock}/>);

  const actButton = getByTestId('task-item');
  fireEvent.press(actButton);
  expect(onPress).toHaveBeenCalled();

  expect(getByText('Teste Title')).toBeTruthy();
  expect(getByText(selectedTaskMock.date)).toBeTruthy();

});

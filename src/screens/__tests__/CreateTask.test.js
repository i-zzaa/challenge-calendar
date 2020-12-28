import { fireEvent, render, cleanup, act, waitFor } from '@testing-library/react-native';
import React from 'react';
import MockedNavigator from '../../utils/__mocks__/MockedNavigator'
import "@testing-library/jest-dom/extend-expect";
import CreateTask from '../CreateTask';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { selectedTaskMock, dateTest }from '../../utils/__mocks__/selectedTask' 

const pickerCity = [
    { name: 'cidade 1', id: 0 },
    { name: 'cidade 2', id: 1 },
  ];

  beforeEach(() => {
    fetch.resetMocks()
})

afterEach(()=> {
    cleanup();
  });

fetch.mockResponseOnce(pickerCity)

test('page should create task', async () => {
  fetch.mockResponseOnce(JSON.stringify(pickerCity))
  fetch.mockResponseOnce(JSON.stringify({"temp":25,"description":"Partly cloudy"}))

  const { getByTestId, getByText } = render (
      <MockedNavigator component={CreateTask}/>
  );

  const dateInput = getByTestId('calendar-list-task');
  await waitFor(() => fireEvent(dateInput, 'onDayPress', { dateString: dateTest }));
  const titleInput = getByTestId('text-input');
  await fireEvent.changeText(titleInput, selectedTaskMock.title);

  const notesTask = getByTestId('notes-task');
  await  fireEvent.changeText(notesTask, selectedTaskMock.notes);

  const timeInput = getByTestId('time-task');
  let timePicker = null;

  await fireEvent.press(timeInput);
  await fireEvent(timeInput, 'onPress');

  timePicker = getByTestId('time-picker');
  await fireEvent(timePicker, 'onConfirm', selectedTaskMock.alarm.time);

  const cityInput = getByTestId('city-task');
  await act(async () => await fireEvent(cityInput, 'onValueChange', pickerCity[0].name))
  expect(cityInput.props.selectedValue).toEqual(selectedTaskMock.city)

  const btnAddTask = getByTestId('btn-add-task');
  await act(async () => await fireEvent(btnAddTask, 'onPress'));
  const todo = await AsyncStorage.getItem('TODO');
  const task =  JSON.parse(todo);
  expect(task[0].todoList).toEqual([selectedTaskMock]);
  expect(titleInput.props.maxLength).toEqual(30)

});
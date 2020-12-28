import { fireEvent, render, cleanup, act, waitFor } from '@testing-library/react-native';
import React from 'react';
import MockedNavigator from '../../utils/__mocks__/MockedNavigator'
import "@testing-library/jest-dom/extend-expect";
import { requestCities, requestWeather } from '../../utils/__mocks__/requests.js'
import CreateTask from '../CreateTask';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { selectedTaskMock, dateTest }from '../../utils/__mocks__/selectedTask' 
import nock from "nock";

const pickerCity = [
    { name: 'cidade 1', id: 0 },
    { name: 'cidade 2', id: 1 },
  ];

  beforeEach(() => {
    fetch.resetMocks()
    requestCities(pickerCity)
    requestWeather()
})

afterEach(()=> {
    nock.cleanAll();
    cleanup();
  });

fetch.mockResponseOnce(pickerCity)

test('page should create task', async () => {
  const { getByTestId, getByText } = render (
      <MockedNavigator component={CreateTask}/>
  );

  await waitFor(()=> {
    const dateInput = getByTestId('calendar-list-task');
    act(()=> {
      fireEvent(dateInput, 'onDayPress', { dateString: dateTest })
    })
  })

  const titleInput = getByTestId('text-input');
  act(()=> {
    fireEvent.changeText(titleInput, selectedTaskMock.title);
  })

  const notesTask = getByTestId('notes-task');
  act(()=> {
    fireEvent.changeText(notesTask, selectedTaskMock.notes);
  })

  const timeInput = getByTestId('time-task');
  let timePicker = null;

  act(()=> {
    fireEvent.press(timeInput);
    fireEvent(timeInput, 'onPress');
  })

  await waitFor(()=> {
    timePicker = getByTestId('time-picker');
    fireEvent(timePicker, 'onConfirm', selectedTaskMock.alarm.time);
  })

  await waitFor(()=> {
    const cityInput = getByTestId('city-task');
    act(()=> {
      fireEvent(cityInput, 'onValueChange', pickerCity[0].name);
    })
    expect(cityInput.props.selectedValue).toEqual(selectedTaskMock.city)

  })

  await waitFor(async () => {
    const btnAddTask = getByTestId('btn-add-task');
    await act(async () => {
      await fireEvent(btnAddTask, 'onPress');
      await fireEvent.press(btnAddTask);
    })
  })

  const todo = await AsyncStorage.getItem('TODO');
  const task =  JSON.parse(todo);

  expect(task[0].todoList).toEqual([selectedTaskMock]);
  expect(titleInput.props.maxLength).toEqual(30)

});
import { fireEvent, render, cleanup, act, waitFor } from '@testing-library/react-native';
import React from 'react';
import MockedNavigator from '../../utils/__mocks__/MockedNavigator'
import "@testing-library/jest-dom/extend-expect";
import { requestCities } from '../../utils/__mocks__/cities.js'
import CreateTask from '../CreateTask';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { selectedTaskMock }from '../../utils/__mocks__/selectedTask' 
import nock from "nock";

const pickerCity = [
    { name: 'cidade 1', id: 0 },
    { name: 'cidade 2', id: 1 },
  ];

  beforeEach(() => {
    fetch.resetMocks()
    requestCities(pickerCity)
})

afterEach(()=> {
    nock.cleanAll();
    cleanup();
  });

fetch.mockResponseOnce(JSON.stringify(pickerCity))

test('page contains the header and 10 items', async () => {

  const { getByTestId, getByText } = React.forwardRef(() => {
    const myRef = React.useRef();
    render (
        <MockedNavigator ref={myRef} component={CreateTask}/>
    );

    const titleInput = getByTestId('text-input');
    act(()=> {
      fireEvent.changeText(titleInput, 'Teste Title');
    })
    expect(titleInput.props.value).toEqual(selectedTaskMock.title)
    expect(titleInput.props.maxLength).toEqual(30)
  
    const noteInput = getByTestId('notes-task');
    act(()=> {
      fireEvent.changeText(noteInput, 'Teste Note');
    })
    expect(noteInput.props.value).toEqual(selectedTaskMock.notes)


    waitFor(()=> {
      const timeInput = getByTestId('time-task');
      act(()=> {
        fireEvent.press(timeInput);
        fireEvent(timeInput, 'onValueChange', '3:11 PM');
      })
      expect(timeInput.props.value).toEqual(selectedTaskMock.alarm.time)
    })

    const alarmInput = getByTestId('alarm-task');
    act(()=> {
      fireEvent(alarmInput, 'onValueChange');
    })
    expect(alarmInput.props.value).toEqual(selectedTaskMock.alarm.isOn)


    waitFor(()=> {
      const cityInput = getByTestId('city-task');
      act(()=> {
        fireEvent(cityInput, 'onValueChange', pickerCity[0].name);
      })
      expect(cityInput.props.value).toEqual(selectedTaskMock.city)
    })

    const btnAddTask = getByTestId('btn-add-task');
    act(()=> {
      fireEvent.press(btnAddTask);
    })
    

    AsyncStorage.setItem('TODO', selectedTaskMock)
    expect(AsyncStorage.getItem).toBeCalledWith('TODO')



  })


});


// test('should render the tag buttons', React.forwardRef(() => {

//   const myRef = React.useRef();
  
//   const { getByTestId, getByText } = render(
//     <MockedNavigator ref={myRef} component={CreateTask}/>
//   );
  
//   // const titleInput = getByTestId('text-input');
//   // act(()=> {
//   //   fireEvent.changeText(titleInput, 'Teste Title');
//   // })
//   // expect(titleInput.props.value).toEqual(selectedTaskMock.title)
//   // expect(titleInput.props.maxLength).toEqual(30)

//   // const noteInput = getByTestId('notes-task');
//   // act(()=> {
//   //   fireEvent.changeText(noteInput, 'Teste Note');
//   // })
//   // expect(noteInput.props.value).toEqual(selectedTaskMock.notes)

//   // waitFor(()=> {
//   //   const timeInput = getByTestId('time-task');
//   //   act(()=> {
//   //     fireEvent.press(timeInput);
//   //     fireEvent(timeInput, 'onValueChange', '3:11 PM');
//   //   })
//   //   expect(timeInput.props.value).toEqual(selectedTaskMock.alarm.time)
//   // })

//   // const alarmInput = getByTestId('alarm-task');
//   // act(()=> {
//   //   fireEvent(alarmInput, 'onValueChange');
//   // })
//   // expect(alarmInput.props.value).toEqual(selectedTaskMock.alarm.isOn)


//   // waitFor(()=> {
//   //   const cityInput = getByTestId('city-task');
//   //   act(()=> {
//   //     fireEvent(cityInput, 'onValueChange', pickerCity[0].name);
//   //   })
//   //   expect(cityInput.props.value).toEqual(selectedTaskMock.city)
//   // })

//   // const btnAddTask = getByTestId('btn-add-task');
//   // act(()=> {
//   //   fireEvent.press(btnAddTask);
//   // })
  

//   // await AsyncStorage.setItem('TODO', selectedTaskMock)
//   // expect(AsyncStorage.getItem).toBeCalledWith('TODO')

// //expect(AsyncStorage.getItem).toBeCalledWith('myKey');
// }))

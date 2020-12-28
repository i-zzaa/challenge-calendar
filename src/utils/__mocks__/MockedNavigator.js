import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TodoStore from '../../data/TodoStore'
import { selectedTaskNullMock } from './selectedTask'
import { render } from '@testing-library/react-native';

export const navigation = {
  currentDate: '2020-12-21',
  isCreate: true,
  selectedTask: selectedTaskNullMock,
  updateCurrentTask: jest.fn(),
};

const Stack = createStackNavigator();
const MockedNavigator = ({component}) => {
  
  return (
    <TodoStore>
        <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
            name="MockedScreen"
            component={component}
            initialParams={navigation}
            
            />
        </Stack.Navigator>
        </NavigationContainer>
    </TodoStore>
  );

  
};

export default MockedNavigator;
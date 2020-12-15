import * as Permissions from 'expo-permissions';
import React, { useEffect } from 'react';
import { SafeAreaView, Platform } from 'react-native';

//import { AppContainer } from './routes';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import TodoStore from './data/TodoStore';
import CreateTask from './screens/CreateTask';
import Home from './screens/Home';

const AppNavigator = createStackNavigator(
  {
    Home,
    CreateTask,
  },
  {
    headerMode: 'none',
  }
);

const AppContainer = createAppContainer(AppNavigator);

const App = () => {
  const askForCalendarPermissions = async () => {
    await Permissions.askAsync(Permissions.CALENDAR);
  };

  const askForReminderPermissions = async () => {
    if (Platform.OS === 'android') {
      return true;
    }
    await Permissions.askAsync(Permissions.REMINDERS);
  };

  useEffect(() => {
    askForCalendarPermissions();
    askForReminderPermissions();
  }, []);

  return (
    <SafeAreaView>
      <TodoStore>
        <AppContainer />
      </TodoStore>
    </SafeAreaView>
  );
};

export default App;
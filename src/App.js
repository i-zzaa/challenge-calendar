import  React, {useEffect} from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home'
import CreateTask from './screens/CreateTask'
import TodoStore from './data/TodoStore'
import * as Permissions from 'expo-permissions';


const Stack = createStackNavigator();

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
    disableYellowBox = true;
    askForCalendarPermissions();
    askForReminderPermissions();
  }, []);

  return (
    <TodoStore>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="CreateTask" component={CreateTask} />
          <Stack.Screen name="UpdateTask" component={CreateTask} />
        </Stack.Navigator>
      </NavigationContainer>
    </TodoStore>
  );
}

export default App;
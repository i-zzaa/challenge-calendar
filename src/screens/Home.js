import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Calendar from 'expo-calendar';
import Constants from 'expo-constants';
import moment from 'moment';
import React, { useEffect, useState, useRef, useContext, useCallback } from 'react';
import {
  //AsyncStorage,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
  Dimensions,
  StyleSheet,
  Button,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ButtonClear, ButtonCreateTask, Task, CalendarStrip_ } from '../components'
import { Context } from '../data/Context';

const styles = StyleSheet.create({
  home: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  taskListContent: {
    height: 100,
    width: 327,
    alignSelf: 'center',
    borderRadius: 10,
    shadowColor: '#2E66E7',
    backgroundColor: '#ffffff',
    marginTop: 10,
    marginBottom: 10,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.2,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewTask: {
    position: 'absolute',
    bottom: 40,
    right: 17,
    height: 60,
    width: 60,
    backgroundColor: '#2E66E7',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2E66E7',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 30,
    shadowOpacity: 0.5,
    elevation: 5,
    zIndex: 999,
  },
  title: {
    height: 25,
    borderColor: '#5DD976',
    borderLeftWidth: 1,
    paddingLeft: 8,
    fontSize: 19,
    marginBottom: 20,
  },
  calendarStrip: {
    height: 150,
    paddingTop: 20,
    paddingBottom: 20,
  },
  black: { color: '#000000' },
  highlightDateNumberStyle: {
    color: '#fff',
    backgroundColor: '#2E66E7',
    marginTop: 10,
    height: 35,
    width: 35,
    textAlign: 'center',
    borderRadius: 17.5,
    overflow: 'hidden',
    paddingTop: 6,
    fontWeight: '400',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plus: {
    height: 30,
    width: 30,
  },
  container: {
    width: '100%',
    height: Dimensions.get('window').height - 170,
  },
  contentContainerStyle: {
    paddingBottom: 20,
  },
  containerTask: {
    marginLeft: 13,
    width: '85%',
  },
  containerTask2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  task: {
    color: '#554A4C',
    fontSize: 20,
    fontWeight: '700',
  },
  task1: {
    flexDirection: 'row',
    marginLeft: 20,
  },
  taskDate: {
    color: '#BBBBBB',
    fontSize: 14,
    marginRight: 5,
  },
  taskItem: {
    color: '#BBBBBB',
    fontSize: 14,
  },
  dateNumberStyle: { color: '#000000', paddingTop: 10 },
  dateNameStyle: { color: '#BBBBBB' },
  highlightDateNameStyle: { color: '#2E66E7' },
  disabledDateNameStyle: { color: 'grey' },
  disabledDateNumberStyle: { color: 'grey', paddingTop: 10 },
  iconContainer: { flex: 0.1 },
});

const Home = ( ) => {
  const [markedDate, setMarkedDate] = useState([]);
  const [todoList, setTodoList] = useState([]);
  const calenderRef = React.createRef();
  const [currentDate, setCurrentDate] = useState(moment().format('YYYY-MM-DD'));
  const todoContext = useContext(Context);
  const navigation = useNavigation();

  const datesWhitelist = [
    {
      start: moment(),
      end: moment().add(365, 'days'), // total 4 days enabled
    },
  ];

  const _handleDeletePreviousDayTask = async () => {
    try {
      const todo = await AsyncStorage.getItem('TODO');

      if (todo !== null) {
        const todoList = JSON.parse(todo);

        const todayDate = `${moment().format('YYYY-MM-DD')}`;
        const checkDate = moment(todayDate);
        await todoList.filter((item) => {
          const currDate = moment(item.date);
          const checkedDate = checkDate.diff(currDate, 'days');
          if (checkedDate > 0) {
            item.todoList.forEach(async (listValue) => {
              try {
                await Calendar.deleteEventAsync(listValue.alarm.createEventAsyncRes.toString());
              } catch (error) {
                console.log(error);
              }
            });
            return false;
          }
          return true;
        });

        await AsyncStorage.setItem('TODO', JSON.stringify(updatedList));
        _updateCurrentTask();
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const _updateCurrentTask = useCallback(async (date = currentDate) => {
    try {
      const todo = await AsyncStorage.getItem('TODO');
      if (todo !== null) {
        const todoList = JSON.parse(todo);
        const markDot = todoList.map((item) => item.markedDot);
        const todoLists = await todoList.filter((item) => {
          if (date === item.date) {
            return true;
          }
          return false;
        });
        if (todoLists.length !== 0) {
          todoLists[0].todoList.sort((a, b) => new Date(a.alarm.time) - new Date(b.alarm.time));
          setTodoList(todoLists[0].todoList);
          setMarkedDate(markDot);
        } else {
          setTodoList([]);
          setMarkedDate([]);
        }
      }
    } catch (error) {
      // Error retrieving data
    }
  });

  useEffect(() => {
    _updateCurrentTask();
    _handleDeletePreviousDayTask();
  }, []);

  return (
    <View style={styles.home}>
      <CalendarStrip_
        styles={styles}
        ref={calenderRef}
        markedDates={markedDate}
        datesWhitelist={datesWhitelist}
        onDateSelected={(date) => {
          const selectedDate = moment(date).format('YYYY-MM-DD');
          _updateCurrentTask(selectedDate);
          setCurrentDate(selectedDate);
        }}
      />
      <Text />
      <ButtonClear
        disabled={!todoList.length}
        onPress={async () => {
          await todoContext.cleanAll();
          setTodoList([]);
          setMarkedDate([]);
        }}
      />
      <ButtonCreateTask
        styles={styles}
        onPress={() =>
          navigation.navigate('CreateTask', {
            updateCurrentTask: _updateCurrentTask,
            currentDate,
            isCreate: true,
          })
        }
        />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          {todoList.map((item) => (
            <Task onPress={() =>
              navigation.navigate('UpdateTask', {
                updateCurrentTask: _updateCurrentTask,
                selectedTask: item,
                currentDate,
                isCreate: false,
              })
            } item={item} styles={styles} key={item.key}/> ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;

import Constants from 'expo-constants';
import moment from 'moment';
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Text, View, Dimensions, ScrollView, StyleSheet, LogBox } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { v4 as uuidv4 } from 'uuid';
import { useNavigation, useRoute } from '@react-navigation/native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

import {
  ActButton,
  Alarm,
  BackButton,
  CalendarListComponent,
  City,
  Tag,
  TextInput,
  Times,
  Weather,
} from '../components';
import { createNewCalendar, Context } from '../data';
import { getCity, getWeather } from '../services';

const styles = StyleSheet.create({
  seperator: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#979797',
    alignSelf: 'center',
    marginVertical: 20,
  },
  text: {
    color: '#9CAAC4',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  containerHeader: {
    flexDirection: 'row',
    marginTop: 60,
    width: '100%',
    alignItems: 'center',
  },
  newTask: {
    alignSelf: 'center',
    fontSize: 20,
    width: 120,
    height: 25,
    textAlign: 'center',
  },
  taskContainer: {
    width: 327,
    alignSelf: 'center',
    borderRadius: 20,
    shadowColor: '#2E66E7',
    backgroundColor: '#ffffff',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowRadius: 20,
    shadowOpacity: 0.2,
    elevation: 5,
    padding: 22,
  },
  calenderContainer: {
    marginTop: 30,
    width: 350,
    height: 350,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#eaeef7',
  },
  containerBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateButton: {
    backgroundColor: '#ff6347',
    height: 40,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 40,
    borderRadius: 5,
    justifyContent: 'center',
    marginRight: 20,
    padding: 10,
  },
});

const CreateTask = ( ) => {
  const visibleHeight = Dimensions.get('window').height;
  const todoContext = useContext(Context);
  const navigation = useNavigation();
  const route = useRoute();

  const [currentDay, setCurrentDay] = useState(moment().format());
  const [pickerCity, setPickerCity] = useState([]);
  const [isAlarmSet, setIsAlarmSet] = useState(false);
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
  const [createEventAsyncRes, setCreateEventAsyncRes] = useState('');
  const [selectedDay, setSelectedDay] = useState({
    [moment(currentDay).format('YYYY-MM-DD')]: {
      selected: true,
      selectedColor: '#2E66E7',
    },
  });

  const [selectedTask, setSelectedTask] = useState(
    route.params.selectedTask
      ? route.params.selectedTask
      : {
          title: '',
          notes: '',
          city: '',
          color: '',
          date: route.params.date,
          alarm: {
            time: currentDay,
            isOn: false,
            createEventAsyncRes: '',
          },
          weather: {
            description: '',
            temp: '',
          },
        }
  );

  const _showDateTimePicker = async () => setIsDateTimePickerVisible(true);
  const _hideDateTimePicker = () => setIsDateTimePickerVisible(false);

  const _handleCreateEventData = async (item) => {
    const { updateCurrentTask, currentDate } = route.params;

    const _creatTodo = {
      key: uuidv4(),
      date: currentDay,
      todoList: [
        {
          key: uuidv4(),
          title: item.title,
          notes: item.notes,
          date: item.date,
          city: item.city,
          weather: {
            temp: item.weather.temp,
            description: item.weather.description,
          },
          alarm: {
            time: item.alarm.time,
            isOn: item.alarm.isOn,
            createEventAsyncRes,
          },
          color: item.color,
        },
      ],
      markedDot: {
        date: currentDay,
        dots: [
          {
            key: uuidv4(),
            color: `rgb(${Math.floor(Math.random() * Math.floor(256))},${Math.floor(
              Math.random() * Math.floor(256)
            )},${Math.floor(Math.random() * Math.floor(256))})`,
            selectedDotColor: '#2E66E7',
          },
        ],
      },
    };
    await todoContext.updateTodo(_creatTodo);
    await updateCurrentTask(currentDate);

    navigation.navigate('Home');
  };

  const synchronizeCalendar = async () => {
    const calendarId = await createNewCalendar();
    try {
      const _createEventAsyncRes = await _addEventsToCalendar(calendarId);

      setCreateEventAsyncRes(_createEventAsyncRes, () => {
        _handleCreateEventData(todoContext);
      });
    } catch (e) {
      Alert.alert(e.message);
    }
  };

  const _handleDatePicked = (date) => {
    const selectedDatePicked = date;
    const hour = moment(date).hour();
    const minute = moment(date).minute();
    const newModifiedDay = moment(date).hour(hour).minute(minute);

    const time = {
      ...selectedTask.alarm,
      time: newModifiedDay,
    };

    setSelectedTask({ ...selectedTask, alarm: time });
    _hideDateTimePicker();
  };

  const _getCurrentDay = (date = moment().format('YYYY-MM-DD')) => {
    const dateCurrent = {};
    dateCurrent[moment(date).format('YYYY-MM-DD')] = {
      selected: true,
      selectedColor: '#2E66E7',
    };

    return dateCurrent;
  };

  const _deleteAlarm = async () => {
    // try {
    //   await Calendar.deleteEventAsync(selectedTask.alarm.createEventAsyncRes);
    //   const updateTask = { ...selectedTask };
    //   updateTask.alarm.createEventAsyncRes = '';
    //   selectedTask(updateTask);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const _updateAlarm = async () => {
    const calendarId = await createNewCalendar();

    setSelectedTask({
      ...selectedTask,
      startDate: moment(selectedTask.alarm.time).add(0, 'm').toDate(),
      endDate: moment(selectedTask.alarm.time).add(5, 'm').toDate(),
      timeZone: 'America/Sao_Paulo',
    });
    const event = { ...selectedTask };

    if (selectedTask.alarm.createEventAsyncRes === '') {
      try {
        const createEventAsyncRes = await Calendar.createEventAsync(calendarId.toString(), event);
        const updateTask = { ...selectedTask };
        updateTask.alarm.createEventAsyncRes = createEventAsyncRes;
        selectedTask(updateTask);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await Calendar.updateEventAsync(selectedTask.alarm.createEventAsyncRes.toString(), event);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleOnDayPress = async (day) => {
    const prevSelectTask = { ...selectedTask };
    prevSelectTask.alarm.time = day.dateString;
    prevSelectTask.date = moment(day.dateString).format('YYYY-MM-DD');
    const selected = await _getCurrentDay(day.dateString);
    setSelectedDay(selected);
    setCurrentDay(day.dateString);
    setSelectedTask(prevSelectTask);
  };

  const handleOnChangeValueAlarm = () => {
    const prevSelectedTask = { ...selectedTask };
    prevSelectedTask.alarm.isOn = !prevSelectedTask.alarm.isOn;
    setSelectedTask(prevSelectedTask);
    setIsAlarmSet(prevSelectedTask.alarm.isOn);
  };

  const handleOnPressUpdateTask = async () => {
    const { updateCurrentTask, currentDate } = route.params;
    if (selectedTask.alarm.isOn) {
      await _updateAlarm();
    } else {
      await _deleteAlarm();
    }

    await todoContext.updateSelectedTask({
      date: currentDate,
      todo: selectedTask,
      dateEqual: currentDay === currentDate
    });

    updateCurrentTask(currentDate);
    navigation.navigate('Home');
  };

  const handleOnPressDeleteTask = async () => {
    const { updateCurrentTask, currentDate } = route.params;
    _deleteAlarm();
    await todoContext.deleteSelectedTask({
      date: currentDate,
      todo: selectedTask,
    });
    await updateCurrentTask(currentDate);
    navigation.navigate('Home');
  };

  const handleOnPressAddTask = async () => {
    if (isAlarmSet) {
      await synchronizeCalendar();
    }
    if (!isAlarmSet) {
      _handleCreateEventData(selectedTask);
    }
  };

  const handleOnValueChangeCity = async (itemValue, itemIndex) => {
    setSelectedTask({
      ...selectedTask,
      city: itemValue,
    });
    try {
      const date = moment(selectedTask.date).format('YYYY-MM-DD');
      const _weatherForecast = await getWeather(itemValue, date);
      setSelectedTask({
        ...selectedTask,
        weather: {
          temp: _weatherForecast.temp,
          description: _weatherForecast.description,
        },
        city: itemValue,
      });
    } catch (error) {}
  };

  useEffect(() => {
    const { currentDate } = route.params;
    const _date = _getCurrentDay(currentDate);
    setCurrentDay(currentDate);
    setSelectedDay(_date);
  }, []);

  const _pickerCity = useCallback(async () => {
    try {
      const cities = await getCity();
      setPickerCity(cities);
    } catch (error) {}
  });

  useEffect(() => {
    _pickerCity();
  }, []);

  return (
    <>
      <DateTimePicker
        testID="time-picker"
        isVisible={isDateTimePickerVisible}
        onConfirm={_handleDatePicked}
        onCancel={_hideDateTimePicker}
        mode="time"
      />

      <View style={styles.container} testID="container-task">
        <View style={{ height: visibleHeight }}>
          <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
            <View style={styles.containerHeader}>
              <BackButton onPress={() => navigation.navigate('Home')} />
              <Text style={styles.newTask}> Task</Text>
            </View>
            <View style={styles.calenderContainer}>
              <CalendarListComponent
                date={selectedTask.date}
                onDayPress={(day) => handleOnDayPress(day)}
                selectedDay={selectedDay}
              />
            </View>
            <View style={styles.taskContainer}>
              <TextInput
                testID='text-input'
                title="Title"
                onChangeText={(text) => {
                  setSelectedTask({ ...selectedTask, title: text });
                }}
                value={selectedTask.title}
                placeholder="What do you need to do?"
                maxLength={30}
              />
              <View style={styles.seperator} />
              <Tag  onPress={(color) => setSelectedTask({ ...selectedTask, color })} />
              <View style={styles.seperator} />
              <TextInput
                title="Notes"
                testID="notes-task"
                maxLength={20}
                onChangeText={(text) => setSelectedTask({ ...selectedTask, notes: text })}
                value={selectedTask.notes}
                placeholder="Enter notes about the task."
              />
              <View style={styles.seperator} />
              <Times
                testID='time-task'
                onPress={async () => await _showDateTimePicker()}
                time={moment(selectedTask.alarm.time).format('h:mm A')}
              />
              <View style={styles.seperator} />
              <Alarm
                testID='alarm-task'
                alarm={moment(selectedTask.alarm.time).format('h:mm A')}
                value={selectedTask.alarm.isOn}
                onValueChange={handleOnChangeValueAlarm}
              />
              <View style={styles.seperator} />
              <City
                testID="city-task"
                selectedValue={selectedTask.city}
                pickerCity={pickerCity}
                onValueChange={(itemValue, itemIndex) =>
                  handleOnValueChangeCity(itemValue, itemIndex)
                }
              />
              <View style={styles.seperator} />
              <Weather
                description={selectedTask.weather.description}
                temp={selectedTask.weather.temp}
              />
            </View>
            {route.params.isCreate ? (
              <ActButton
                title="ADD YOUR TASK"
                testID="btn-add-task"
                disabled={selectedTask.title === ''}
                onPress={handleOnPressAddTask}
              />
            ) : (
              <View style={styles.containerBtn}>
                <ActButton
                  title="UPDATE"
                  testID="btn-update-task"
                  onPress={handleOnPressUpdateTask}
                />
                <ActButton
                  title="DELETE"
                  onPress={handleOnPressDeleteTask}
                  style={styles}
                  testID="btn-delete-task"
                />
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default CreateTask;

import { Picker } from '@react-native-picker/picker';
import * as Calendar from 'expo-calendar';
import Constants from 'expo-constants';
import * as Localization from 'expo-localization';
import moment from 'moment';
import React, { useState, useEffect, useContext } from 'react';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  Keyboard,
  Switch,
  StyleSheet,
  Alert,
} from 'react-native';
import { CalendarList } from 'react-native-calendars';
import DateTimePicker from 'react-native-modal-datetime-picker';
import uuid from 'uuid';

import { Context } from '../data/Context';
import { getCity } from '../services/city';

const { width: vw } = Dimensions.get('window');

const styles = StyleSheet.create({
  createTaskButton: {
    width: 252,
    height: 48,
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 5,
    justifyContent: 'center',
  },
  seperator: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#979797',
    alignSelf: 'center',
    marginVertical: 20,
  },
  notesContent: {
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
    marginBottom: 2,
  },
  red: {
    height: 23,
    width: 60,
    backgroundColor: '#b31717',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 7,
  },
  deleteButton: {
    backgroundColor: '#ff6347',
    width: 100,
    height: 38,
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 5,
    justifyContent: 'center',
  },
  updateButton: {
    backgroundColor: '#2E66E7',
    width: 100,
    height: 38,
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 5,
    justifyContent: 'center',
    marginRight: 20,
  },
  blue: {
    height: 23,
    width: 60,
    backgroundColor: '#62CCFB',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 7,
  },
  green: {
    height: 23,
    width: 60,
    backgroundColor: '#4CD565',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 7,
  },
  random: {
    height: 23,
    width: 60,
    backgroundColor: `rgb(${Math.floor(Math.random() * Math.floor(256))},${Math.floor(
      Math.random() * Math.floor(256)
    )},${Math.floor(Math.random() * Math.floor(256))})`,
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 7,
  },
  title: {
    height: 25,
    borderColor: '#5DD976',
    borderLeftWidth: 1,
    paddingLeft: 8,
    fontSize: 19,
    marginBottom: 20,
  },
  taskContainer: {
    height: 800,
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
  newTask: {
    alignSelf: 'center',
    fontSize: 20,
    width: 120,
    height: 25,
    textAlign: 'center',
  },
  backButton: {
    flexDirection: 'row',
    marginTop: 60,
    width: '100%',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#eaeef7',
  },
});

const CreateTask = ({ navigation }) => {
  const [currentDay, setCurrentDay] = useState(moment().format());
  const [taskText, setTaskText] = useState('');
  const [notesText, setNotesText] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [visibleHeight, setVisibleHeight] = useState(Dimensions.get('window').height);
  const [isAlarmSet, setIsAlarmSet] = useState(false);
  const [alarmTime, setAlarmTime] = useState(moment().format());
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
  const [createEventAsyncRes, setCreateEventAsyncRes] = useState('');
  const [selectedDay, setSelectedDay] = useState();
  const [color, setColor] = useState('');
  const [city, setCity] = useState();
  const [pickerCity, setPickerCity] = useState([]);
  const [weather, setWeather] = useState({});

  const [selectedTask, setSelectedTask] = useState(navigation.state.params?.selectedTask);

  const _showDateTimePicker = () => setIsDateTimePickerVisible(true);
  const _hideDateTimePicker = () => setIsDateTimePickerVisible(false);
  const getDate = () => {
    return `${moment(currentDay).format('YYYY')}-${moment(currentDay).format('MM')}-${moment(
      currentDay
    ).format('DD')}`;
  };

  const _handleCreateEventData = async (value) => {
    const { updateCurrentTask, currentDate } = navigation.state.params;
    const _creatTodo = {
      key: uuid(),
      date: getDate(),
      todoList: [
        {
          key: uuid(),
          title: taskText,
          notes: notesText,
          city,
          weather,
          alarm: {
            time: alarmTime,
            isOn: isAlarmSet,
            createEventAsyncRes,
          },
          color,
        },
      ],
      markedDot: {
        date: currentDay,
        dots: [
          {
            key: uuid(),
            color: `rgb(${Math.floor(Math.random() * Math.floor(256))},${Math.floor(
              Math.random() * Math.floor(256)
            )},${Math.floor(Math.random() * Math.floor(256))})`,
            selectedDotColor: '#2E66E7',
          },
        ],
      },
    };

    await value.updateTodo(_creatTodo);
    await updateCurrentTask(currentDate);
    navigation.navigate('Home');
  };

  const handleAlarmSet = () => {
    const prevSelectedTask = { ...selectedTask };
    prevSelectedTask.alarm.isOn = !prevSelectedTask.alarm.isOn;
    setSelectedTask(prevSelectedTask);
  };

  const _handleDatePicked = (date) => {
    const selectedDatePicked = currentDay;
    const hour = moment(date).hour();
    const minute = moment(date).minute();
    const newModifiedDay = moment(selectedDatePicked).hour(hour).minute(minute);

    setAlarmTime(newModifiedDay);
    _hideDateTimePicker();
  };

  const _getCurrentDay = (date = moment().format('YYYY-MM-DD')) => {
    const dateCurrent = {};
    console.log(date);
    dateCurrent[moment(date)] = {
      selected: true,
      selectedColor: '#2E66E7',
    };

    return dateCurrent;
  };

  useEffect(() => {
    if (selectedTask) {
      setTaskText(selectedTask.title);
      setNotesText(selectedTask.notes);
      setCity(selectedTask.city);
      setColor(selectedTask.color);
      setIsAlarmSet(selectedTask.alarm.createEventAsyncRes);
      setWeather(selectedTask.weather);
    }
  }, []);

  useEffect(() => {
    const { currentDate } = navigation.state.params;
    const _currentDay = _getCurrentDay(currentDate);

    const _pickerCity = async () => {
      try {
        const cities = await getCity();
        setCurrentDay(_currentDay);

        setPickerCity(cities);
      } catch (error) {}
    };
    _pickerCity();
  }, []);

  const _keyboardDidShow = (e) => {
    setKeyboardHeight(e.endCoordinates.height);
    setVisibleHeight(Dimensions.get('window').height - e.endCoordinates.height - 30);
  };
  const _keyboardDidHide = () => {
    setVisibleHeight(Dimensions.get('window').height);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  return (
    <Context.Consumer>
      {(value) => (
        <>
          <DateTimePicker
            isVisible={isDateTimePickerVisible}
            onConfirm={_handleDatePicked}
            onCancel={_hideDateTimePicker}
            mode="time"
          />

          <View style={styles.container}>
            <View
              style={{
                height: visibleHeight,
              }}>
              <ScrollView
                contentContainerStyle={{
                  paddingBottom: 100,
                }}>
                <View style={styles.backButton}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    style={{ marginRight: vw / 2 - 120, marginLeft: 20 }}>
                    <Image
                      style={{ height: 25, width: 40 }}
                      source={require('../../assets/back.png')}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>

                  <Text style={styles.newTask}> Task</Text>
                </View>
                <View style={styles.calenderContainer}>
                  <CalendarList
                    style={{
                      width: 350,
                      height: 350,
                    }}
                    current={currentDay}
                    minDate={moment().format()}
                    horizontal
                    pastScrollRange={0}
                    pagingEnabled
                    calendarWidth={350}
                    onDayPress={(day) => {
                      //const _selected = selectedDay;
                      const _selected = {};
                      const date = day.dateString;
                      _selected[date] = {
                        selected: true,
                        selectedColor: '#2E66E7',
                      };
                      setSelectedDay(_selected);

                      setCurrentDay(day.dateString);
                      setAlarmTime(day.dateString);
                    }}
                    monthFormat="yyyy MMMM"
                    hideArrows
                    markingType="dot"
                    theme={{
                      selectedDayBackgroundColor: '#2E66E7',
                      selectedDayTextColor: '#ffffff',
                      todayTextColor: '#2E66E7',
                      backgroundColor: '#eaeef7',
                      calendarBackground: '#eaeef7',
                      textDisabledColor: '#d9dbe0',
                    }}
                    markedDates={selectedDay}
                  />
                </View>
                <View style={styles.taskContainer}>
                  <TextInput
                    style={styles.title}
                    onChangeText={(text) => setTaskText(text)}
                    value={taskText}
                    placeholder="What do you need to do?"
                    maxLength={30}
                  />
                  <Text style={styles.text}>Tag</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => setColor('green')} style={styles.green}>
                      <Text style={{ textAlign: 'center', fontSize: 14 }}>Green</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setColor('blue')} style={styles.blue}>
                      <Text style={{ textAlign: 'center', fontSize: 14 }}>Blue</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setColor('red')} style={styles.red}>
                      <Text style={{ textAlign: 'center', fontSize: 14 }}>Red</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        setColor(
                          `rgb(${Math.floor(Math.random() * Math.floor(256))},${Math.floor(
                            Math.random() * Math.floor(256)
                          )},${Math.floor(Math.random() * Math.floor(256))})`
                        )
                      }
                      style={styles.random}>
                      <Text style={{ textAlign: 'center', fontSize: 14 }}>Random</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.notesContent} />
                  <View>
                    <Text style={styles.text}>Notes</Text>
                    <TextInput
                      style={{
                        height: 25,
                        fontSize: 19,
                        marginTop: 3,
                      }}
                      maxLength={20}
                      onChangeText={(text) => setNotesText(text)}
                      value={notesText}
                      placeholder="Enter notes about the task."
                    />
                  </View>

                  <View style={styles.seperator} />
                  <View>
                    <Text style={styles.text}>Times</Text>
                    <TouchableOpacity
                      onPress={() => _showDateTimePicker()}
                      style={{
                        height: 25,
                        marginTop: 3,
                      }}>
                      <Text style={{ fontSize: 19 }}>{moment(alarmTime).format('h:mm A')}</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.seperator} />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View>
                      <Text style={styles.text}>Alarm</Text>
                      <View
                        style={{
                          height: 25,
                          marginTop: 3,
                        }}>
                        <Text style={{ fontSize: 19 }}>{moment(alarmTime).format('h:mm A')}</Text>
                      </View>
                    </View>
                    <Switch value={isAlarmSet} onValueChange={handleAlarmSet} />
                  </View>
                  <View style={styles.seperator} />
                  <View>
                    <Text style={styles.text}>City</Text>
                    <Picker
                      selectedValue={city}
                      onValueChange={async (itemValue, itemIndex) => {
                        try {
                          setCity(itemValue);

                          let date = new Date(alarmTime);
                          date = moment(date).format('DD-MM-YYYY');
                          const _weatherForecast = await getWeather(itemValue, date);

                          setWeather(_weatherForecast);
                        } catch (error) {}
                      }}>
                      <Picker.Item label="Selecione" value="selecione" />
                      {pickerCity.map((_city) => (
                        <Picker.Item key={_city.id} label={_city.name} value={_city.name} />
                      ))}
                    </Picker>
                  </View>
                  <View style={styles.seperator} />
                  <View>
                    <Text style={styles.text}>Weather</Text>
                    <Text
                      style={{
                        fontSize: 18,
                        textAlign: 'left',
                        color: '#afafaf',
                        margin: 3,
                      }}>
                      {`Description: ${weather?.description || ''}`}
                    </Text>

                    <Text
                      style={{
                        fontSize: 18,
                        textAlign: 'left',
                        color: '#afafaf',
                      }}>
                      {`Temp: ${weather?.temp || ''}`}
                    </Text>
                  </View>
                </View>

                {!selectedTask ? (
                  <TouchableOpacity
                    disabled={taskText === ''}
                    style={[
                      styles.createTaskButton,
                      {
                        backgroundColor: taskText === '' ? 'rgba(46, 102, 231,0.5)' : '#2E66E7',
                      },
                    ]}
                    onPress={async () => {
                      if (isAlarmSet) {
                        await synchronizeCalendar(value);
                      }
                      if (!isAlarmSet) {
                        _handleCreateEventData(value);
                      }
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        textAlign: 'center',
                        color: '#fff',
                      }}>
                      ADD YOUR TASK
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={async () => {
                        //_handleModalVisible();
                        if (selectedTask.alarm.isOn) {
                          await _updateAlarm();
                        } else {
                          await _deleteAlarm();
                        }

                        await value.updateSelectedTask({
                          date: currentDate,
                          todo: selectedTask,
                        });
                        _updateCurrentTask(currentDate);
                        setIsModalVisible(false);
                      }}
                      style={styles.updateButton}>
                      <Text
                        style={{
                          fontSize: 18,
                          textAlign: 'center',
                          color: '#fff',
                        }}>
                        UPDATE
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={async () => {
                        //_handleModalVisible();
                        _deleteAlarm();
                        await value.deleteSelectedTask({
                          date: currentDate,
                          todo: selectedTask,
                        });
                        _updateCurrentTask(currentDate);
                        setIsModalVisible(false);
                      }}
                      style={styles.deleteButton}>
                      <Text
                        style={{
                          fontSize: 18,
                          textAlign: 'center',
                          color: '#fff',
                        }}>
                        DELETE
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </ScrollView>
            </View>
          </View>
        </>
      )}
    </Context.Consumer>
  );
};

export default CreateTask;

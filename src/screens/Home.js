//import AsyncStorage from '@react-native-async-storage/async-storage';
<<<<<<< Updated upstream
import DateTimePicker from '@react-native-community/datetimepicker';
=======
import { Picker } from '@react-native-picker/picker';
>>>>>>> Stashed changes
import * as Calendar from 'expo-calendar';
import Constants from 'expo-constants';
import moment from 'moment';
import React, { useEffect, useState, useRef } from 'react';
import {
  AsyncStorage,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
  Dimensions,
  TextInput,
  Switch,
  StyleSheet,
  Alert,
  Platform,
  Button,
<<<<<<< Updated upstream
=======
  //Picker,
  LogBox,
>>>>>>> Stashed changes
} from 'react-native';

//import * as Localization from 'expo-localization';
import CalendarStrip from 'react-native-calendar-strip';
import DateTimePicker from 'react-native-modal-datetime-picker';
//import DateTimePicker from 'react-native-modal-datetime-picker';

import Task from '../components/Task';
import { Context } from '../data/Context';
import { getWeather } from '../services/weather';

const styles = StyleSheet.create({
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
  sepeerator: {
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
  learn: {
    height: 23,
    width: 51,
    backgroundColor: '#F8D557',
    justifyContent: 'center',
    borderRadius: 5,
  },
  design: {
    height: 23,
    width: 59,
    backgroundColor: '#62CCFB',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 7,
  },
  readBook: {
    height: 23,
    width: 83,
    backgroundColor: '#4CD565',
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
    height: 475,
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
  red: {
    height: 23,
    width: 60,
    backgroundColor: '#b31717',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 7,
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
  text: {
    color: '#9CAAC4',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
});

const Home = ({ navigation }) => {
  const [markedDate, setMarkedDate] = useState([]);
  const [todoList, setTodoList] = useState([]);
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [weather, setWeather] = useState();

  const calenderRef = useRef(null);
<<<<<<< Updated upstream
=======

  const [closeFloatView, setloseFloatView] = useState(false);
>>>>>>> Stashed changes

  const [datesWhitelist, setDatesWhitelist] = useState([
    {
      start: moment(),
      end: moment().add(365, 'days'), // total 4 days enabled
    },
  ]);

<<<<<<< Updated upstream
  const [currentDate, setCurrentDate] = useState(
    `${moment().format('YYYY')}-${moment().format('MM')}-${moment().format('DD')}`
  );
=======
  // const [currentDate, setCurrentDate] = useState(
  //   `${moment().format('YYYY')}-${moment().format('MM')}${moment().format('DD')}'T'00:00:00.000-00:00`
  // );

  const [currentDate, setCurrentDate] = useState('2020-01-01');
>>>>>>> Stashed changes

  const _handleDeletePreviousDayTask = async () => {
    try {
      const value = await AsyncStorage.getItem('TODO');

      if (value !== null) {
        const todoList = JSON.parse(value);
        const todayDate = `${moment().format('YYYY')}-${moment().format('MM')}-${moment().format(
          'DD'
        )}`;
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

        // await AsyncStorage.setItem('TODO', JSON.stringify(updatedList));
        _updateCurrentTask(currentDate);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const _updateCurrentTask = async (currentDate) => {
    try {
      const value = await AsyncStorage.getItem('TODO');
      if (value !== null) {
        const todoList = JSON.parse(value);
        const markDot = todoList.map((item) => item.markedDot);
        const todoLists = todoList.filter((item) => {
          if (currentDate === item.date) {
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
          setMarkedDate(markDot);
        }
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const _handleDatePicked = (date) => {
    const prevSelectedTask = { ...selectedTask };
    const selectedDatePicked = prevSelectedTask.alarm.time;
    const hour = moment(date).hour();
    const minute = moment(date).minute();
    const newModifiedDay = moment(selectedDatePicked).hour(hour).minute(minute);

    prevSelectedTask.alarm.time = newModifiedDay;
    setSelectedTask(prevSelectedTask);

    _hideDateTimePicker();
  };

  const handleAlarmSet = () => {
    const prevSelectedTask = { ...selectedTask };
    prevSelectedTask.alarm.isOn = !prevSelectedTask.alarm.isOn;
    setSelectedTask(prevSelectedTask);
  };

  const _updateAlarm = async () => {
    const calendarId = await _createNewCalendar();
    const event = {
      title: selectedTask.title,
      notes: selectedTask.notes,
      startDate: moment(selectedTask.alarm.time).add(0, 'm').toDate(),
      endDate: moment(selectedTask.alarm.time).add(5, 'm').toDate(),
      //timeZone: Localization.timezone,
      timeZone: 'America/Sao_Paulo',
    };

    if (selectedTask.alarm.createEventAsyncRes === '') {
      try {
        const createEventAsyncRes = await Calendar.createEventAsync(calendarId.toString(), event);
        const updateTask = { ...selectedTask };
        updateTask.alarm.createEventAsyncRes = createEventAsyncRes;
        setSelectedTask(updateTask);
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

  const _deleteAlarm = async () => {
    console.log(selectedTask.alarm);

    try {
      await Calendar.deleteEventAsync(selectedTask.alarm.createEventAsyncRes);

      const updateTask = { ...selectedTask };
      updateTask.alarm.createEventAsyncRes = '';
      setSelectedTask(updateTask);
    } catch (error) {
      console.log(error);
    }
  };

  const _getEvent = async (_selectedTask) => {
    if (_selectedTask.alarm.createEventAsyncRes) {
      try {
        await Calendar.getEventAsync(_selectedTask.alarm.createEventAsyncRes.toString());
      } catch (error) {
        console.log(error);
      }
    }
  };

  const _findCalendars = async () => {
    const calendars = await Calendar.getCalendarsAsync();
    return calendars;
  };

  const _showDateTimePicker = () => setIsDateTimePickerVisible(true);
  const _hideDateTimePicker = () => setIsDateTimePickerVisible(false);

  const _createNewCalendar = async () => {
    const calendars = await _findCalendars();
    const newCalendar = {
      title: 'test',
      entityType: Calendar.EntityTypes.EVENT,
      color: '#2196F3',
      sourceId:
        Platform.OS === 'ios'
          ? calendars.find((cal) => cal.source && cal.source.name === 'Default').source.id
          : undefined,
      source:
        Platform.OS === 'android'
          ? {
              name: calendars.find((cal) => cal.accessLevel === Calendar.CalendarAccessLevel.OWNER)
                .source.name,
              isLocalAccount: true,
            }
          : undefined,
      name: 'test',
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
      ownerAccount:
        Platform.OS === 'android'
          ? calendars.find((cal) => cal.accessLevel === Calendar.CalendarAccessLevel.OWNER)
              .ownerAccount
          : undefined,
    };

    let calendarId = null;

    try {
      calendarId = await Calendar.createCalendarAsync(newCalendar);
    } catch (e) {
      Alert.alert(e.message);
    }

    return calendarId;
  };

  const update = (index, value) => {
    const prevSelectedTask = { ...selectedTask };
    prevSelectedTask[index] = value;
    setSelectedTask(prevSelectedTask);
  };

  useEffect(() => {
<<<<<<< Updated upstream
    const weatherForecast = async () => {
      try {
        const _weatherForecast = await getWeather();
        setWeather(_weatherForecast.results.forecast[0]);
=======
    //   const weatherForecast = async () => {
    //     try {
    //       const _weatherForecast = await getWeather();
    //       setWeather(_weatherForecast.results.forecast[0]);
    //     } catch (error) {}
    //   };
    _handleDeletePreviousDayTask();
    //   weatherForecast();
    const _pickerCity = async () => {
      try {
        const cities = await getCity();
        setPickerCity(cities);
>>>>>>> Stashed changes
      } catch (error) {}
    };
    _handleDeletePreviousDayTask();
    weatherForecast();
  }, []);

  return (
    <Context.Consumer>
      {(value) => (
        <>
          {selectedTask !== null && (
            <Task isModalVisible={isModalVisible}>
              <DateTimePicker
                isVisible={false}
                onConfirm={_handleDatePicked}
                onCancel={_hideDateTimePicker}
                mode="time"
                value={moment(currentDate).format("YYYY-MM-DD'T'HH:mm:ss.sssZ")}
              />
              <View style={styles.taskContainer}>
<<<<<<< Updated upstream
                <TextInput
                  style={styles.title}
                  onChangeText={(text) => {
                    const prevSelectedTask = { ...selectedTask };
                    prevSelectedTask.title = text;
                    setSelectedTask(prevSelectedTask);
                  }}
                  value={selectedTask.title}
                  placeholder="What do you need to do?"
                />
                <Text style={styles.text}>Tag</Text>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity onPress={() => update('color', 'green')} style={styles.green}>
                    <Text style={{ textAlign: 'center', fontSize: 14 }}>Green</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => update('color', 'blue')} style={styles.blue}>
                    <Text style={{ textAlign: 'center', fontSize: 14 }}>Blue</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => update('color', 'red')} style={styles.red}>
                    <Text style={{ textAlign: 'center', fontSize: 14 }}>Red</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      update(
                        'color',
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
                  <Text
                    style={{
                      color: '#9CAAC4',
                      fontSize: 16,
                      fontWeight: '600',
                    }}>
                    Notes
                  </Text>
=======
                <ScrollView>
>>>>>>> Stashed changes
                  <TextInput
                    style={styles.title}
                    onChangeText={(text) => {
                      const prevSelectedTask = { ...selectedTask };
                      prevSelectedTask.title = text;
                      setSelectedTask(prevSelectedTask);
                    }}
                    value={selectedTask.title}
                    placeholder="What do you need to do?"
                  />
                  <Text style={styles.text}>Tag</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => update('color', 'green')} style={styles.green}>
                      <Text style={{ textAlign: 'center', fontSize: 14 }}>Green</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => update('color', 'blue')} style={styles.blue}>
                      <Text style={{ textAlign: 'center', fontSize: 14 }}>Blue</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => update('color', 'red')} style={styles.red}>
                      <Text style={{ textAlign: 'center', fontSize: 14 }}>Red</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        update(
                          'color',
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
                    <Text
                      style={{
                        color: '#9CAAC4',
                        fontSize: 16,
                        fontWeight: '600',
                      }}>
                      Notes
                    </Text>
                    <TextInput
                      style={{
                        height: 25,
                        fontSize: 19,
                        marginTop: 3,
                      }}
                      onPress={(text) => update('notes', text)}
                      value={selectedTask.notes}
                      placeholder="Enter notes about the task."
                    />
                  </View>
                  <View style={styles.sepeerator} />
                  <View>
                    <Text
                      style={{
                        color: '#9CAAC4',
                        fontSize: 16,
                        fontWeight: '600',
                      }}>
                      Times
                    </Text>
                    <TouchableOpacity
                      onPress={() => _showDateTimePicker()}
                      onValueChange={(value) => {
                        const prevSelectedTask = { ...selectedTask };
                        prevSelectedTask.alarm.time = value;
                        setSelectedTask(prevSelectedTask);
                      }}
                      style={{
                        height: 25,
                        marginTop: 3,
                      }}>
                      <Text style={{ fontSize: 19 }}>
                        {moment(selectedTask.alarm.time).format('h:mm A')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.sepeerator} />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View>
                      <Text
                        style={{
                          color: '#9CAAC4',
                          fontSize: 16,
                          fontWeight: '600',
                        }}>
                        Alarm
                      </Text>
                      <View
                        style={{
                          height: 25,
                          marginTop: 3,
                        }}>
                        <Text style={{ fontSize: 19 }}>
                          {moment(selectedTask.alarm.time).format('h:mm A')}
                        </Text>
                      </View>
                    </View>
                    <Switch value={selectedTask.alarm.isOn} onValueChange={handleAlarmSet} />
                  </View>
<<<<<<< Updated upstream
                  <Switch value={selectedTask.alarm.isOn} onValueChange={handleAlarmSet} />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={async () => {
                      _handleModalVisible();
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
                    }}
                    style={styles.updateButton}>
=======
                  <View style={styles.seperator} />
                  <View>
                    <Text style={styles.text}>City</Text>
                    <Picker
                      selectedValue={city}
                      onValueChange={async (itemValue, itemIndex) => {
                        try {
                          setCity(itemValue);
                          // const _weatherForecast = await getWeather( city, moment(alarmTime).format('yyyy-mm-dd'));
                          // setWeather(_weatherForecast.results.forecast[0]);
                        } catch (error) {}
                      }}>
                      <Picker.Item label="Selecione" value="selecione" />
                      {pickerCity.map((_city) => (
                        <Picker.Item key={_city.id} label={_city.nome} value={_city.nome} />
                      ))}
                    </Picker>
                  </View>
                  <View>
>>>>>>> Stashed changes
                    <Text
                      style={{
                        fontSize: 18,
                        textAlign: 'center',
                        color: '#afafaf',
                      }}>
                      Weather forecast
                    </Text>
<<<<<<< Updated upstream
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={async () => {
                      _handleModalVisible();
                      _deleteAlarm();
                      await value.deleteSelectedTask({
                        date: currentDate,
                        todo: selectedTask,
                      });
                      _updateCurrentTask(currentDate);
                    }}
                    style={styles.deleteButton}>
=======
>>>>>>> Stashed changes
                    <Text
                      style={{
                        fontSize: 18,
                        textAlign: 'center',
                        color: '#afafaf',
                      }}>
                      {/* {`Max: ${weather?.data.temperature.max} Min: ${weather?.data.temperature.min}`} */}
                      {`Max: ${Math.trunc(Math.random() * (15 - 38) + 38)} Min: ${Math.trunc(
                        Math.random() * (-2 - 15) + 15
                      )}`}
                    </Text>
<<<<<<< Updated upstream
                  </TouchableOpacity>
                </View>
=======
                  </View>

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
                </ScrollView>
>>>>>>> Stashed changes
              </View>
            </Task>
          )}
          <View
            style={{
              flex: 1,
              paddingTop: Constants.statusBarHeight,
            }}>
            <CalendarStrip
              ref={calenderRef}
              calendarAnimation={{ type: 'sequence', duration: 30 }}
              daySelectionAnimation={{
                type: 'background',
                duration: 200,
                highlightColor: '#ffffff',
              }}
              style={{
                height: 150,
                paddingTop: 20,
                paddingBottom: 20,
              }}
              calendarHeaderStyle={{ color: '#000000' }}
              dateNumberStyle={{ color: '#000000', paddingTop: 10 }}
              dateNameStyle={{ color: '#BBBBBB' }}
              highlightDateNumberStyle={{
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
              }}
              highlightDateNameStyle={{ color: '#2E66E7' }}
              disabledDateNameStyle={{ color: 'grey' }}
              disabledDateNumberStyle={{ color: 'grey', paddingTop: 10 }}
              datesWhitelist={datesWhitelist}
              iconLeft={require('../../assets/left-arrow.png')}
              iconRight={require('../../assets/right-arrow.png')}
              iconContainer={{ flex: 0.1 }}
              markedDates={markedDate}
              onDateSelected={(date) => {
                const selectedDate = `${moment(date).format('YYYY')}-${moment(date).format(
                  'MM'
                )}-${moment(date).format('DD')}`;
                _updateCurrentTask(selectedDate);
                setCurrentDate(selectedDate);
              }}
            />
            <Text />
            <Text
              style={{
                fontSize: 18,
                textAlign: 'center',
                color: '#afafaf',
              }}>
              {`Weather forecast: ${weather?.description} `}
            </Text>
            <Text
              style={{
                fontSize: 18,
                textAlign: 'center',
                color: '#afafaf',
              }}>
              {`Max: ${weather?.max} Min: ${weather?.min}`}
            </Text>

            <View>
              <TouchableOpacity>
                <Button
                  title="Clean All"
                  disabled={!todoList.length}
                  onPress={async () => {
                    await value.cleanAll();

                    setTodoList([]);
                    setMarkedDate([]);
                    _updateCurrentTask(null);
                  }}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CreateTask', {
                  updateCurrentTask: _updateCurrentTask,
                  currentDate,
                  createNewCalendar: _createNewCalendar,
                })
              }
              style={styles.viewTask}>
              <Image
                source={require('../../assets/plus.png')}
                style={{
                  height: 30,
                  width: 30,
                }}
              />
            </TouchableOpacity>
            <View
              style={{
                width: '100%',
                height: Dimensions.get('window').height - 170,
              }}>
              <ScrollView
                contentContainerStyle={{
                  paddingBottom: 20,
                }}>
                {todoList.map((item) => (
                  <TouchableOpacity
                    onPress={async () => {
                      try {
<<<<<<< Updated upstream
                        await setSelectedTask(item);
                        await _getEvent(item);
                        await setIsModalVisible(true);
                      } catch (error) {}
=======
                        setSelectedTask(item);
                        _getEvent(item);
                        setIsModalVisible(true);
                      } catch (error) {
                        error;
                      }
>>>>>>> Stashed changes
                    }}
                    key={item.key}
                    style={styles.taskListContent}>
                    <View
                      style={{
                        marginLeft: 13,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            height: 12,
                            width: 12,
                            borderRadius: 6,
                            backgroundColor: item.color,
                            marginRight: 8,
                          }}
                        />
                        <Text
                          style={{
                            color: '#554A4C',
                            fontSize: 20,
                            fontWeight: '700',
                          }}>
                          {item.title}
                        </Text>
                      </View>
                      <View>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginLeft: 20,
                          }}>
                          <Text
                            style={{
                              color: '#BBBBBB',
                              fontSize: 14,
                              marginRight: 5,
                            }}>{`${moment(item.alarm.time).format('YYYY')}/${moment(
                            item.alarm.time
                          ).format('MM')}/${moment(item.alarm.time).format('DD')}`}</Text>
                          <Text
                            style={{
                              color: '#BBBBBB',
                              fontSize: 14,
                            }}>
                            {item.notes}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        height: 80,
                        width: 5,
                        backgroundColor: item.color,
                        borderRadius: 5,
                      }}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </>
      )}
    </Context.Consumer>
  );
};

export default Home;

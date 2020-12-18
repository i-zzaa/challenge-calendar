import { Picker } from '@react-native-picker/picker';
import Constants from 'expo-constants';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  Switch,
  StyleSheet,
} from 'react-native';
import { CalendarList } from 'react-native-calendars';
import DateTimePicker from 'react-native-modal-datetime-picker';
import uuid from 'uuid';

import { createNewCalendar } from '../data/Calendar';
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
  const [visibleHeight, setVisibleHeight] = useState(Dimensions.get('window').height);
  const [isAlarmSet, setIsAlarmSet] = useState(false);
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
  const [createEventAsyncRes, setCreateEventAsyncRes] = useState('');
  const [selectedDay, setSelectedDay] = useState();
  const [alarmTime, setAlarmTime] = useState(currentDay);
  const [pickerCity, setPickerCity] = useState([]);

  const [selectedTask, setSelectedTask] = useState(
    navigation.state.params.selectedTask
      ? navigation.state.params.selectedTask
      : {
          title: '',
          notes: '',
          city: '',
          color: '',
          date: currentDay,
          alarm: {
            time: moment().format('h:mm A'),
            isOn: false,
            createEventAsyncRes: '',
          },
          weather: {},
        }
  );

  const _showDateTimePicker = () => setIsDateTimePickerVisible(true);
  const _hideDateTimePicker = () => setIsDateTimePickerVisible(false);

  const _handleCreateEventData = async (value) => {
    const { updateCurrentTask, currentDate } = navigation.state.params;
    const _creatTodo = {
      key: uuid(),
      date: currentDate,
      todoList: [
        {
          key: uuid(),
          title: selectedTask.title,
          notes: selectedTask.notes,
          date: selectedTask.date,
          city: selectedTask.city,
          weather: selectedTask.weather,
          alarm: {
            time: alarmTime,
            isOn: isAlarmSet,
            createEventAsyncRes,
          },
          color: selectedTask.color,
        },
      ],
      markedDot: {
        date: selectedDay,
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

  const _handleUpdateEventData = async (value) => {
    const { updateCurrentTask, currentDate } = navigation.state.params;

    await value.updateSelectedTask(selectedTask);
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
    dateCurrent[moment(date)] = {
      selected: true,
      selectedColor: '#2E66E7',
    };

    return dateCurrent;
  };

  const _deleteAlarm = async () => {
    try {
      await Calendar.deleteEventAsync(selectedTask.alarm.createEventAsyncRes);

      const updateTask = { ...selectedTask };
      updateTask.alarm.createEventAsyncRes = '';
      selectedTask(updateTask);
    } catch (error) {
      console.log(error);
    }
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

  useEffect(() => {
    const { currentDate, updateCurrentTask } = navigation.state.params;
    const _date = _getCurrentDay(currentDate);

    const _pickerCity = async () => {
      try {
        const cities = await getCity();
        setSelectedDay(_date);
        setCurrentDay(currentDate);
        updateCurrentTask(currentDate);

        setPickerCity(cities);
      } catch (error) {}
    };
    _pickerCity();
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
                    current={selectedTask.date}
                    minDate={moment().format()}
                    horizontal
                    pastScrollRange={0}
                    pagingEnabled
                    calendarWidth={350}
                    onDayPress={(day) => {
                      const _selected = {};
                      const date = day.dateString;
                      _selected[date] = {
                        selected: true,
                        selectedColor: '#2E66E7',
                      };

                      setCurrentDay(day.dateString);
                      setAlarmTime(day.dateString);

                      const prevSelectTask = { ...setSelectedTask };
                      prevSelectTask.alarm.time = day.dateString;
                      prevSelectTask.date = moment(day.dateString).format('YYYY-MM-DD');

                      setSelectedTask(prevSelectTask);
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
                    onChangeText={(text) => setSelectedTask({ ...selectedTask, title: text })}
                    value={selectedTask.title}
                    placeholder="What do you need to do?"
                    maxLength={30}
                  />
                  <Text style={styles.text}>Tag</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                      onPress={() => setSelectedTask({ ...selectedTask, color: 'green' })}
                      style={styles.green}>
                      <Text style={{ textAlign: 'center', fontSize: 14 }}>Green</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setSelectedTask({ ...selectedTask, color: 'blue' })}
                      style={styles.blue}>
                      <Text style={{ textAlign: 'center', fontSize: 14 }}>Blue</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setSelectedTask({ ...selectedTask, color: 'red' })}
                      style={styles.red}>
                      <Text style={{ textAlign: 'center', fontSize: 14 }}>Red</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        setSelectedTask({
                          ...selectedTask,
                          color: `rgb(${Math.floor(Math.random() * Math.floor(256))},${Math.floor(
                            Math.random() * Math.floor(256)
                          )},${Math.floor(Math.random() * Math.floor(256))})`,
                        })
                      }
                      style={styles.random}>
                      <Text style={{ textAlign: 'center', fontSize: 14 }}>Random</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={selectedTask.notes} />
                  <View>
                    <Text style={styles.text}>Notes</Text>
                    <TextInput
                      style={{
                        height: 25,
                        fontSize: 19,
                        marginTop: 3,
                      }}
                      maxLength={20}
                      onChangeText={(text) => setSelectedTask({ ...selectedTask, notes: text })}
                      value={selectedTask.notes}
                      placeholder="Enter notes about the task."
                    />
                  </View>

                  <View style={styles.seperator} />
                  <View>
                    <Text style={styles.text}>Times</Text>
                    <TouchableOpacity
                      onPress={() => _showDateTimePicker()}
                      value={selectedTask.alarm.time}
                      onValueChange={(time) => {
                        const prevSelectedTask = { ...selectedTask };
                        prevSelectedTask.alarm.times = time;
                        setSelectedTask(prevSelectedTask);
                      }}
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
                      selectedValue={selectedTask.city}
                      onValueChange={async (itemValue, itemIndex) => {
                        try {
                          setCity(itemValue);

                          let date = new Date(alarmTime);
                          date = moment(date).format('DD-MM-YYYY');
                          const _weatherForecast = await getWeather(itemValue, date);

                          setSelectedTask({
                            ...selectedTask,
                            city: itemValue,
                            weather: _weatherForecast,
                          });
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
                      {`Description: ${selectedTask.weather?.description || ''}`}
                    </Text>

                    <Text
                      style={{
                        fontSize: 18,
                        textAlign: 'left',
                        color: '#afafaf',
                      }}>
                      {`Temp: ${selectedTask.weather?.temp || ''}`}
                    </Text>
                  </View>
                </View>

                {navigation.state.params.isCreate ? (
                  <TouchableOpacity
                    disabled={selectedTask.title === ''}
                    style={[
                      styles.createTaskButton,
                      {
                        backgroundColor:
                          selectedTask.title === '' ? 'rgba(46, 102, 231,0.5)' : '#2E66E7',
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
                        await _updateAlarm();
                        _handleUpdateEventData(value);
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
                        const { updateCurrentTask, currentDate } = navigation.state.params;

                        _deleteAlarm();
                        await value.deleteSelectedTask({
                          date: currentDate,
                          todo: selectedTask,
                        });
                        await updateCurrentTask(currentDate);
                        navigation.navigate('Home');
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

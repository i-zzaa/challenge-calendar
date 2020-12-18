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
  StyleSheet,
  Button,
} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';

import { Context } from '../data/Context';

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
  title: {
    height: 25,
    borderColor: '#5DD976',
    borderLeftWidth: 1,
    paddingLeft: 8,
    fontSize: 19,
    marginBottom: 20,
  },
});

const Home = ({ navigation }) => {
  const [markedDate, setMarkedDate] = useState([]);
  const [todoList, setTodoList] = useState([]);
  const calenderRef = useRef(null);
  const [currentDate, setCurrentDate] = useState(moment().format('YYYY-MM-DD'));

  const datesWhitelist = [
    {
      start: moment(),
      end: moment().add(365, 'days'), // total 4 days enabled
    },
  ];

  const _handleDeletePreviousDayTask = async () => {
    try {
      const value = await AsyncStorage.getItem('TODO');

      if (value !== null) {
        const todoList = JSON.parse(value);
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

  const _updateCurrentTask = async (date = currentDate) => {
    try {
      const value = await AsyncStorage.getItem('TODO');
      if (value !== null) {
        const todoList = JSON.parse(value);
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
  };

  useEffect(() => {
    _updateCurrentTask();
    _handleDeletePreviousDayTask();
  }, []);

  return (
    <Context.Consumer>
      {(value) => (
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
              const selectedDate = moment(date).format('YYYY-MM-DD');
              _updateCurrentTask(selectedDate);
              setCurrentDate(selectedDate);
            }}
          />
          <Text />

          <View>
            <TouchableOpacity>
              <Button
                title="Clean All"
                disabled={!todoList.length}
                onPress={async () => {
                  await value.cleanAll();

                  setTodoList([]);
                  setMarkedDate([]);
                }}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CreateTask', {
                updateCurrentTask: _updateCurrentTask,
                currentDate,
                isCreate: true,
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
                  onPress={() =>
                    navigation.navigate('UpdateTask', {
                      updateCurrentTask: _updateCurrentTask,
                      selectedTask: item,
                      currentDate,
                      isCreate: false,
                    })
                  }
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
      )}
    </Context.Consumer>
  );
};

export default Home;

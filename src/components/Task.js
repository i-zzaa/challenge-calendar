import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import moment from 'moment';


const Task = ({ onPress, styles, item}) => {
  return (
    <TouchableOpacity
    testID='task-item'
    onPress={onPress}
    key={item.key}
    style={styles?.taskListContent}>
    <View style={styles?.containerTask}>
      <View style={styles?.containerTask2}>
        <View
          style={{
            height: 12,
            width: 12,
            borderRadius: 6,
            backgroundColor: item.color,
            marginRight: 8,
          }}
        />
        <Text style={styles?.task}>{item.title}</Text>
      </View>
      <View>
        <View style={styles?.task1}>
          <Text style={styles?.taskDate}>{moment(item.alarm.time).format('YYYY-MM-DD')}</Text>
          <Text style={styles?.taskItem}>{item.notes}</Text>
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
  );
}

export default Task;
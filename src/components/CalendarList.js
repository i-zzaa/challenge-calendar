import moment from 'moment';
import React from 'react';
import { CalendarList } from 'react-native-calendars';

const CalendarListComponent = ({ date, selectedDay, onDayPress }) => {
  return (
    <CalendarList
      style={{
        width: 350,
        height: 350,
      }}
      testID="calendar-list-task"
      current={date}
      minDate={moment().format()}
      horizontal
      pastScrollRange={0}
      pagingEnabled
      calendarWidth={350}
      onDayPress={onDayPress}
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
  );
};

export default CalendarListComponent;

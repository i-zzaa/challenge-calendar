import React from 'react';
import CalendarStrip from 'react-native-calendar-strip';


const CalendarStrip_ = ({onDateSelected, markedDate, styles, calenderRef, datesWhitelist}) => {
  return (
    <CalendarStrip
    ref={calenderRef}
    calendarAnimation={{ type: 'sequence', duration: 30 }}
    daySelectionAnimation={{
      type: 'background',
      duration: 200,
      highlightColor: '#ffffff',
    }}
    style={styles?.calendarStrip}
    calendarHeaderStyle={styles?.black}
    dateNumberStyle={styles?.dateNumberStyle}
    dateNameStyle={styles?.dateNameStyle}
    highlightDateNumberStyle={styles?.highlightDateNumberStyle}
    highlightDateNameStyle={styles?.highlightDateNameStyle}
    disabledDateNameStyle={styles?.disabledDateNameStyle}
    disabledDateNumberStyle={styles?.disabledDateNumberStyle}
    datesWhitelist={datesWhitelist}
    iconLeft={require('../../assets/left-arrow.png')}
    iconRight={require('../../assets/right-arrow.png')}
    iconContainer={styles?.iconContainer}
    markedDates={markedDate}
    onDateSelected={(date) => onDateSelected(date)}
  />
  );
}

export default CalendarStrip_;
import * as Calendar from 'expo-calendar';
import { Alert, Platform } from 'react-native';

const _findCalendars = async () => {
  const calendars = await Calendar.getCalendarsAsync();
  return calendars;
};

export const createNewCalendar = async () => {
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

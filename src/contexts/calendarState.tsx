import React, { createContext, useReducer, useState } from 'react';

import calendarReducer from './calendarReducer';
import DateTimePicker from '@react-native-community/datetimepicker';


export interface InitialState {
  type_preview: string;
  current_date?: Date;
  setCurrentDate: Function
}

export interface CalendarType {
  children?: any;
}

const INICIAL_STATE  = {
  type_preview: 'month',
  setCurrentDate: () => {}
}

export const CalendarContext = createContext<InitialState> (INICIAL_STATE, );

export const CalendarProvider = <CalendarType> ({ children }) => {
  const [state, dispatch] = useReducer(calendarReducer, INICIAL_STATE);
  const [date, setDate] = useState(new Date(1598051730000));
  
  return (
    <CalendarContext.Provider value={{ state, dispatch }}>{children}</CalendarContext.Provider>
  );
};

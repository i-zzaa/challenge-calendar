import uuid from 'uuid';

export const selectedTaskMock = {
  key: uuid(),
  title: 'Teste Title',
  notes: 'Teste Note',
  date: '2020-12-12',
  city: 'cidade 2',
  weather: {
    temp: 25,
    description: 'Partly cloudy',
  },
  alarm: {
    time: '3:11 PM',
    isOn: true,
    createEventAsyncRes: '',
  },
  color: 'green',
};

export const selectedTaskNullMock = {
  key: uuid(),
  title: '',
  notes: '',
  date: '',
  city: '',
  weather: {
    temp: '',
    description: '',
  },
  alarm: {
    time: null,
    isOn: false,
    createEventAsyncRes: '',
  },
  color: '',
};

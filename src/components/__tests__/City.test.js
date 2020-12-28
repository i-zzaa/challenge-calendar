import { fireEvent, render, cleanup } from '@testing-library/react-native';
import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import nock from "nock";

import City from '../City';
import { requestCities } from '../../utils/__mocks__/cities.js'

const pickerCity = [
  { name: 'cidade 1', id: 0 },
  { name: 'cidade 2', id: 1 },
];

afterEach(()=> {
  nock.cleanAll();
  cleanup();
});

beforeEach(()=> {
  requestCities(pickerCity)
})

test('should render a picker with the cities', async () => {
  const onValueChange = jest.fn();

  const { getByTestId, getByText } = render(
    <City onValueChange={onValueChange} pickerCity={pickerCity} selectedValue={pickerCity[0].name} />
  );

  const picker = getByTestId('city-task');
  fireEvent(picker, 'onValueChange', pickerCity[1].name);
  expect(onValueChange).toHaveBeenCalled();
  expect(getByText('City')).toBeTruthy();

});
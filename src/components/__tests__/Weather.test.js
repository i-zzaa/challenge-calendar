import { render, cleanup } from '@testing-library/react-native';
import React from 'react';
import Weather from '../Weather';

beforeEach(() => {
  fetch.resetMocks()
})

afterEach(()=> {
  cleanup();
});

test('should render text of weather', async () => {
  fetch.mockResponseOnce(JSON.stringify({"temp":25,"description":"Partly cloudy"}))

  const { getByTestId } = render(<Weather description="partly cloudy" temp="25" />);

  const descriptionText = getByTestId('description-task');
  expect(descriptionText.children[0]).toEqual('Description: partly cloudy');

  const tempText = getByTestId('temp-task');
  expect(tempText.children[0]).toEqual('Temp: 25º');
});

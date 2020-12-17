<<<<<<< Updated upstream
export const getWeather = async () => {
  try {
    const response = await fetch('https://api.hgbrasil.com/weather');
=======
//https://api.hgbrasil.com/weather?array_limit=2&fields=temp,city_name=%22S%C3%A3o%20Paulo%22,date=2020-11-11&key=4ae

const TOKEN = '4ae57153';
const BASE_API = 'https://api.hgbrasil.com/weather';

export const getWeather = async (city, date) => {
  //https://api.hgbrasil.com/weather?array_limit=2&fields=only_results,temp,city_name=Campinas,description,max,min,date=20-11-2020&key=4ae57153
  try {
    const response = await fetch(
      `${BASE_API}?array_limit&fields=only_results,temp,description,city_name="${city}",date=${date}&key=${TOKEN}`
    );

>>>>>>> Stashed changes
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
};

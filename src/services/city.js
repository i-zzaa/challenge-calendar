//http://apiadvisor.climatempo.com.br/doc/index.html#api-Locale-GetCityByNameAndState
const TOKEN = '737484a6c2948b3bddf1f11e8e5aa12f';
const BASE_API = 'http://apiadvisor.climatempo.com.br/api/v1';

export const getCity = async (city) => {
  //http://apiadvisor.climatempo.com.br/api/v1/locale/city?country=BR&token=737484a6c2948b3bddf1f11e8e5aa12f

  try {
    const response = await fetch(`${BASE_API}/locale/city?country=BR&token=${TOKEN}`);
    const responseJson = await response.json();

    return responseJson;
  } catch (error) {
    console.error(error);
  }
};

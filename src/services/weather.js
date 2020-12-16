export const getWeather = async () => {
  try {
    const response = await fetch('https://api.hgbrasil.com/weather');
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
};

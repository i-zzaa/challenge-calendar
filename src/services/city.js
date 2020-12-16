export const getCity = async () => {
  try {
    const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/distritos');
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
};

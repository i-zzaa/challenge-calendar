import nock from "nock";

export const requestCities =  (pickerCity) =>  nock("http://apiadvisor.climatempo.com.br/api/v1/locale/city?country=BR&token=737484a6c2948b3bddf1f11e8e5aa12f")
.get()
.delay(2000)
.reply(200, pickerCity)

export const requestWeather =  () =>  nock("https://api.hgbrasil.com/weather?array_limit=2&fields=only_results,temp,city_name=Campinas,description,max,min,date=20-11-2020&key=4ae57153")
.get()
.delay(2000)
.reply(200, {"temp":25,"description":"Partly cloudy"})
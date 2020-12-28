import nock from "nock";

export const requestCities =  (pickerCity) =>  nock("http://apiadvisor.climatempo.com.br/api/v1/locale/city?country=BR&token=737484a6c2948b3bddf1f11e8e5aa12f")
.get()
.delay(2000)
.reply(200, pickerCity)
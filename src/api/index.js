import api from './instance'
// 用的接口是高德的接口，需要密码 key
export const  getLivesWeatherData = (city) => api.get(`/weatherInfo?key=d91ae9cbeb0dbeeb9acacafe24593383&city=${city}`)
export const  getForecastData = (city) => api.get(`/weatherInfo?key=d91ae9cbeb0dbeeb9acacafe24593383&city=${city}&extensions=all`)


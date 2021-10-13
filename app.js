const request =  require('postman-request');
const url = 'http://api.weatherstack.com/current?access_key=5c68b7ea2ba8518addfb9fbac098ac94&query=53.2953821,2.1402895&units=f';


request(url, function(error, response, body){
    const data = JSON.parse(body);
    // console.log('ERROR', error);
    // console.log('StatusCode', response && response.statusCode);
    // console.log('Current weather: ', data.current)

    console.log(data.current.weather_descriptions[0] + ' Its currently ' + data.current.temperature + ' degrees out but it feels like ' + data.current.feelslike + ' degrees');
})
import request from 'request';

export const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e6f0cba33caec6ba1f89a04ff0649d4d&query=' + encodeURIComponent(latitude)  + ',' + encodeURIComponent(longitude);
    
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location.', undefined);
        } else {
            callback(undefined, 'Temperature is ' + body.current.temperature + ' with ' + body.current.precip + ' precipitation')
        };
    });
};

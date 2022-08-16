import request from 'request';

export const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=3a4bcce7adaa01f19886c05a14f112f3&query=' + encodeURIComponent(address);

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                location: body.data[0].label
            });
        };
    });
};

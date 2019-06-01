

var filterAirport = (input, next) => {
    let promises = []
    input.forEach((value, index, array) => {
        promises.push(new Promise((resolve, reject) => {
            request.get(
                `http://localhost:3004/airports/${value.DESTINATION_AIRPORT}`,
                {},
                (err, response, body) => {
                    console.log(JSON.parse(body).name);
                    value.DESTINATION_AIRPORT_NAME = JSON.parse(body).name
                    array[index] = value
                    resolve()
                });

        }))
    })
    Promise.all(promises).then(() => {
        next(null, input)
    })
};

module.exports = filterAirport;

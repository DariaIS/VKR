module.exports = function (app, db) {

    app.get('/byPerson', (req, res) => {
        const idPerson = req.query.person;

        db.query(
            "SELECT `date`, license_plate, region, car_brand, arrival_time, departure_time FROM arriving_date INNER JOIN car, `date`, person WHERE person.id_person = ? AND car.id_person = person.id_person AND arriving_date.id_car = car.id_car AND arriving_date.id_date = date.id_date",
            [idPerson],
            (err, result) => {
                if (err) {
                    res.send({ err: err });
                    throw err;
                }
                else {
                    result.forEach(elem => {
                        elem.id = elem.departure_time + elem.arrival_time;
                        elem.date = new Date(elem.date).toLocaleDateString();
                        elem.license_plate = elem.license_plate + ' ' + elem.region;
                        delete elem.region;
                        if (!elem.departure_time)
                            elem.departure_time = 'Нет данных'
                    });
                    res.send({ result });
                }
            }
        );
    });
}
module.exports = function (app, db) {

    app.get('/byPlate', (req, res) => {
        const idCar = req.query.plate;

        db.query(
            "SELECT `date`, arrival_time, departure_time FROM arriving_date INNER JOIN car, `date` WHERE car.id_car = ? AND arriving_date.id_car = car.id_car AND  arriving_date.id_date = date.id_date",
            [idCar],
            (err, result) => {
                // console.log(result)
                if (err) {
                    res.send({ err: err });
                    throw err;
                }
                else {
                    result.forEach(elem => {
                        elem.id = elem.date;
                        elem.date = new Date(elem.date).toLocaleDateString();
                        if (!elem.departure_time)
                            elem.departure_time = 'Нет данных';
                        if (!elem.arrival_time)
                            elem.arrival_time = 'Нет данных';
                    });
                    res.send({ result });
                }
            }
        );
    });
}
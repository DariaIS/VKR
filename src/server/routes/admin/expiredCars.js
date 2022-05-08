module.exports = function (app, db) {

    app.get('/expiredCars', (req, res) => {
        db.query(
            "SELECT id_car, license_plate, region, car_brand, expiration_date FROM car WHERE (expiration_date < (CURDATE() + INTERVAL 1 MONTH) && expiration_date > (CURDATE() - INTERVAL 1 MONTH))",
            (err, result) => {
                if (err)
                    res.send({ err: err });
                else {
                    result.forEach(elem => {
                        elem.expiration_date = new Date(elem.expiration_date).toLocaleDateString();
                        elem.license_plate = elem.license_plate + ' ' + elem.region;
                        delete elem.region;
                    });
                    res.send({ result });
                }
            }
        );
    });

    app.post('/expiredCars', (req, res) => {
        const idCar = req.body.idCar;

        db.query(
            "UPDATE car SET expiration_date = expiration_date + INTERVAL 1 YEAR WHERE id_car=?",
            [idCar], (err, result) => {
                if (err)
                    res.send({ err: 'Не удалось обновить дату!' });
                else res.send({ message: 'Дата успешно обновлена!' });
            }
        );
    });
}
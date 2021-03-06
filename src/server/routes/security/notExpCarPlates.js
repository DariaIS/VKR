module.exports = function (app, db) {

    app.get('/notExpCarPlates', (req, res) => {
        db.query(
            "SELECT id_car, license_plate, region FROM car WHERE expiration_date > CURDATE()",
            (err, result) => {
                if (err)
                    res.send({ err: 'Произошла ошибка. Пожалуйста, попробуйте снова позже!' });
                else {
                    result.forEach(elem => {
                        elem.label = elem.license_plate + ' ' + elem.region;
                        elem.value = [elem.license_plate, elem.region];
                        delete elem.region;
                        delete elem.license_plate;
                        delete elem.id_car;
                    });
                    res.send({ result });
                }
            }
        );
    });
}
module.exports = function (app, db) {

    app.get('/allCarPlates', (req, res) => {
        db.query(
            "SELECT id_car, license_plate, region FROM car",
            (err, result) => {
                if (err)
                    res.send({ err: 'Произошла ошибка. Пожалуйста, попробуйте снова позже!' });
                else {
                    result.forEach(elem => {
                        elem.label = elem.license_plate + ' ' + elem.region;
                        elem.value = elem.id_car;
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
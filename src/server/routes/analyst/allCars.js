module.exports = function (app, db) {

    app.get('/allCars', (req, res) => {
        db.query(
            "SELECT id_car, license_plate, region, car_brand, last_name, middle_name, name, start_date, expiration_date FROM car LEFT JOIN person ON person.id_person=car.id_person WHERE expiration_date > CURDATE()",
            (err, result) => {
                if (err)
                    res.send({ err: err });
                else {
                    result.forEach(elem => {
                        elem.start_date = new Date(elem.start_date).toLocaleDateString();
                        elem.expiration_date = new Date(elem.expiration_date).toLocaleDateString();
                        elem.license_plate = elem.license_plate + ' ' + elem.region;
                        delete elem.region;
                        if (elem.name != null)
                            elem.name = elem.last_name + ' ' + elem.name + ' ' + elem.middle_name;
                        else elem.name = 'Нет данных'
                        delete elem.last_name;
                        delete elem.middle_name;
                        delete elem.position;
                        delete elem.chair;
                        elem.id = elem.id_car;
                        delete elem.id_car;
                    });
                    res.send({ result });
                }
            }
        );
    });
}
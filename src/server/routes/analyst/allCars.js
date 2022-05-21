module.exports = function (app, db) {

    app.get('/allCars', (req, res) => {
        db.query(
            "SELECT id_car, license_plate, region, car_brand, last_name, middle_name, name, chair, start_date, expiration_date, position FROM car LEFT JOIN (person INNER JOIN chair ON person.id_chair = chair.id_chair) ON person.id_person=car.id_person WHERE expiration_date > CURDATE()",
            (err, result) => {
                if (err)
                    res.send({ err: err });
                else {
                    result.forEach(elem => {
                        if (elem.position === 'student')
                            elem.position = 'Студент';
                        else elem.position = 'Сотрудник';
                        if (elem.name != null)
                            elem.person = elem.last_name + ' ' + elem.name + ' ' + elem.middle_name + '. ' + elem.chair + '. ' + elem.position;
                        else elem.person = 'Нет данных'
                        elem.start_date = new Date(elem.start_date).toLocaleDateString();
                        elem.expiration_date = new Date(elem.expiration_date).toLocaleDateString();
                        elem.license_plate = elem.license_plate + ' ' + elem.region;
                        delete elem.region;
                        delete elem.last_name;
                        delete elem.name;
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
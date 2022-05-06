module.exports = function (app, db) {

    app.get('/carTable', (req, res) => {
        db.query(
            "SELECT * FROM car INNER JOIN person ON person.id_person WHERE person.id_person=car.id_person",
            (err, result) => {
                if (err)
                    res.send({ err: err });
                else {
                    result.forEach(elem => {
                        elem.start_date = new Date(elem.start_date).toLocaleDateString();
                        elem.expiration_date = new Date(elem.expiration_date).toLocaleDateString();
                        elem.license_plate = elem.license_plate + ' ' + elem.region;
                        delete elem.region;
                        elem.name = elem.last_name + ' ' + elem.name + ' ' + elem.middle_name;
                        delete elem.last_name;
                        delete elem.middle_name;
                    });
                    res.send({ result });
                }
            }
        );
    });
}
module.exports = function (app, db) {

    app.get('/changeData', (req, res) => {

        let idCar = req.query.plate;
        console.log(req.query.plate);
        db.query(
            "SELECT car.id_car, id_person, gates.gates_name, gates.id_gates, license_plate, region, car_brand, expiration_date FROM car INNER JOIN gates_allowed, gates WHERE car.id_car = ? AND gates_allowed.id_car = car.id_car AND gates_allowed.id_gates = gates.id_gates",
            [idCar], (err, result) => {
                if (err) {
                    throw err
                }
                else {
                    let data = {
                        plate: result[0].license_plate + ' ' + result[0].region,
                        car_brand: result[0].car_brand,
                        id_person: result[0].id_person,
                        expiration_date: new Date(result[0].expiration_date).toLocaleDateString(),
                        gates: []
                    };
                    result.forEach(elem => {
                        data.gates.push({value: elem.id_gates, label: elem.gates_name})
                    });
                    res.send({ result: data });
                }
            }
        );
    });
}
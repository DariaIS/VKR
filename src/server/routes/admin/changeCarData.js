module.exports = function (app, db) {

    app.get('/changeCarData', (req, res) => {

        const idCar = req.query.plate;
        let carData = {
            id_car: null,
            plate: null,
            car_brand: null,
            id_person: null,
            expiration_date: null,
            gates: []
        };
        let peopleList = [];
        let gatesList = [];

        const getAllPeople = () => {
            return new Promise((resolve, reject) => {
                db.query(
                    "SELECT * FROM person INNER JOIN chair ON person.id_chair = chair.id_chair",
                    (err, result) => {
                        if (err) {
                            console.log(err);
                            return reject('Произошла ошибка. Пожалуйста, попробуйте снова позже!');
                        }
                        else {
                            result.forEach(elem => {
                                if (elem.position === 'student')
                                    elem.position = 'Студент';
                                else elem.position = 'Сотрудник';

                                elem.label = elem.last_name + ' ' + elem.name + ' ' + elem.middle_name + '. ' + elem.chair + '. ' + elem.position;
                                elem.value = elem.id_person;
                                delete elem.last_name;
                                delete elem.name;
                                delete elem.middle_name;
                                delete elem.position;
                                delete elem.chair;
                                delete elem.id_person;
                                delete elem.id_chair;
                            });
                            peopleList = result;

                            return resolve(peopleList);
                        }
                    }
                );
            });
        }

        const getAllGates = () => {
            return new Promise((resolve, reject) => {
                db.query(
                    "SELECT id_gates, gates_name FROM gates",
                    (err, result) => {
                        if (err) {
                            console.log(err);
                            return reject('Произошла ошибка. Пожалуйста, попробуйте снова позже!');
                        }
                        else {
                            result.forEach(elem => {
                                elem.label = elem.gates_name;
                                elem.value = elem.id_gates;
                                delete elem.gates_name;
                                delete elem.id_gates;
                            });
                            gatesList = result;

                            return resolve(gatesList);
                        }
                    }
                );
            });
        }

        const getCarData = () => {
            return new Promise((resolve, reject) => {
                db.query(
                    "SELECT car.id_car, id_person, gates.gates_name, gates.id_gates, license_plate, region, car_brand, expiration_date FROM car INNER JOIN gates_allowed, gates WHERE car.id_car = ? AND gates_allowed.id_car = car.id_car AND gates_allowed.id_gates = gates.id_gates",
                    [idCar], (err, result) => {
                        if (err) {
                            console.log(err);
                            return reject('Произошла ошибка. Пожалуйста, попробуйте снова позже!');
                        }
                        else {
                            carData.id_car = result[0].id_car;
                            carData.plate = result[0].license_plate + ' ' + result[0].region;
                            carData.car_brand = result[0].car_brand;
                            carData.id_person = result[0].id_person;
                            let tempDate = new Date(result[0].expiration_date).toLocaleDateString();
                            carData.expiration_date = tempDate.split('.')[2] + '-' + tempDate.split('.')[1] + '-' + tempDate.split('.')[0];
                            carData.gates = [];

                            result.forEach(elem => {
                                carData.gates.push({ label: elem.gates_name, value: elem.id_gates })
                            });

                            return resolve(carData);
                        }
                    }
                );
            });
        }


        async function getData() {

            try {
                await getAllPeople();
                await getAllGates();
                await getCarData();
                res.send({ peopleList, gatesList, carData });
            } catch (err) {
                res.send({ err: err });
            }
        }

        getData();
    });

    app.post("/changeCarData", async (req, res) => {

        console.log(req.body);
        const plateId = req.body.plateId;
        const personId = req.body.personId;
        const expDate = req.body.expDate;
        const brand = req.body.brand;
        const gates = req.body.gates;

        const updateBrandPerson = () => {
            return new Promise((resolve, reject) => {
                db.query(
                    "UPDATE car SET id_person = ?, car_brand = ?, expiration_date = ? WHERE id_car = ?",
                    [personId, brand, expDate, plateId], (err, result) => {

                        if (err) {
                            console.log(err);
                            return reject('Произошла ошибка. Пожалуйста, попробуйте снова позже!');
                        }
                        return resolve(result);
                    });
            });
        }

        const deleteGates = () => {
            return new Promise((resolve, reject) => {
                db.query(
                    "DELETE FROM gates_allowed WHERE id_car = ?",
                    [plateId], (err, result) => {
                        if (err) {
                            console.log(err);
                            return reject('Произошла ошибка. Пожалуйста, попробуйте снова позже!');
                        }

                        return resolve(result);
                    });
            });
        }

        let addGates = () => {
            return new Promise((resolve, reject) => {
                db.query(
                    "INSERT INTO gates_allowed (id_car, id_gates) VALUES ?",
                    [gates], (err, result) => {
                        if (err) {
                            console.log(err);
                            return reject('Произошла ошибка. Пожалуйста, попробуйте снова позже!');
                        }

                        res.send({ message: 'Запись успешно добавлена!' });
                        return resolve(result);
                    });
            });
        }

        async function changeCarData() {

            try {
                await updateBrandPerson();
                await deleteGates();
                await addGates();
            } catch (err) {
                res.send({ err: err });
            }
        }

        changeCarData();
    });
}
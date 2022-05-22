const translit = require('../../functions/translitRuEn');

module.exports = function (app, db) {

    app.post("/addCar", (req, res) => {
        let plate = req.body.plate;
        const region = req.body.region;
        const brand = req.body.brand;
        const idGates = '1';

        let idCar;
        let isCarAlreadyExist = false;
        let isCarExpired = false;
        let hasGates = false;

        const fixPlate = () => {
            return new Promise((resolve, reject) => {
                plate = translit(plate);
                if (!plate) {

                    return reject('Неверный формат номера!');
                }

                return resolve(plate);
            });
        }

        const checkCarExist = () => {
            return new Promise((resolve, reject) => {
                db.query(
                    "SELECT id_car FROM car WHERE license_plate=? AND region=?",
                    [plate, region], (err, result) => {
                        if (err) {
                            console.log(err);
                            return reject('Произошла ошибка. Пожалуйста, попробуйте снова позже!');
                        }

                        if (result.length !== 0) {
                            isCarAlreadyExist = true;
                            idCar = result[0].id_car;
                        }

                        return resolve(result);
                    }
                );
            });
        }

        const checkDateExpired = () => {
            return new Promise((resolve, reject) => {
                db.query(
                    "SELECT id_car FROM car WHERE id_car = ? AND expiration_date < CURDATE()",
                    [idCar], (err, result) => {
                        if (err) {
                            console.log(err);
                            return reject('Произошла ошибка. Пожалуйста, попробуйте снова позже!');
                        }

                        if (result.length !== 0)
                            isCarExpired = true;

                        return resolve(result);
                    });
            });
        }

        const addCar = () => {
            return new Promise((resolve, reject) => {
                db.query(
                    "INSERT INTO car (car_brand, license_plate, region, start_date, expiration_date) VALUES (?, ?, ?, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 YEAR))",
                    [brand, plate, region], (err, result) => {
                        if (err) {
                            console.log(err);
                            return reject('Произошла ошибка. Пожалуйста, попробуйте снова позже!');
                        }

                        idCar = result.insertId;
                        return resolve(result);
                    });
            });
        }

        const checkGates = () => {
            return new Promise((resolve, reject) => {
                db.query(
                    "SELECT * FROM gates_allowed WHERE id_car = ? AND id_gates = ? ",
                    [idCar, idGates], (err, result) => {
                        if (err) {
                            console.log(err);
                            return reject('Произошла ошибка. Пожалуйста, попробуйте снова позже!');
                        }

                        if (result.length !== 0) {
                            hasGates = true;
                            if (!isCarExpired)
                                res.send({ err: 'У автомобиля уже есть доступ к данной проходной!' });
                        }
                        return resolve(result);
                    });
            });
        }

        const addGates = () => {
            return new Promise((resolve, reject) => {
                db.query(
                    "INSERT INTO gates_allowed (id_car, id_gates) VALUES (?, ?)",
                    [idCar, idGates], (err, result) => {
                        if (err) {
                            console.log(err);
                            return reject('Произошла ошибка. Пожалуйста, попробуйте снова позже!');
                        }

                        if (isCarAlreadyExist) {
                            if (!isCarExpired)
                                res.send({ message: 'Автомобилю предоставлен доступ к данной проходной!' });
                        } else res.send({ message: 'Запись успешно добавлена!' });
                        return resolve(result);
                    });
            });
        }

        const updateDate = () => {
            return new Promise((resolve, reject) => {
                db.query(
                    "UPDATE car SET expiration_date = DATE_ADD(CURDATE(), INTERVAL 1 YEAR) WHERE id_car=?",
                    [idCar], (err, result) => {
                        if (err) {
                            console.log(err);
                            return reject('Произошла ошибка. Пожалуйста, попробуйте снова позже!');
                        }

                        if (!hasGates)
                            res.send({ message: 'Дата истечения прав доступа обновлена, автомобилю предоставлен доступ к данной проходной!' });
                        else res.send({ message: 'Дата истечения прав доступа успешно обновлена!' });
                        return resolve(result);
                    });
            });
        }


        async function CarAdding() {

            try {
                await fixPlate();
                await checkCarExist();
                if (isCarAlreadyExist) {
                    await checkDateExpired();
                    await checkGates();
                }
                if (!isCarAlreadyExist)
                    await addCar();
                if (!hasGates)
                    await addGates();
                if (isCarExpired)
                    await updateDate();

            } catch (error) {
                res.send({ err: error });
            }
        }
        CarAdding();
    });
}
const translit = require('../../functions/translitRuEn');

module.exports = function (app, db) {

    app.post("/addCar", (req, res) => {
        let plate = req.body.plate;
        const region = req.body.region;
        const brand = req.body.brand;
        const gates = '7 корпус';

        let idCar, idGates;
        let warning = false;
        let isCarExist = false;
        let isCarExpired = true;

        const getIdGates = () => {
            return new Promise((resolve, reject) => {
                db.query(
                    "SELECT id_gates FROM gates WHERE gates_name=?",
                    [gates], (err, result) => {

                        if (err) {
                            warning = true;
                            return reject(err);
                        }

                        idGates = result[0].id_gates;
                        return resolve(result);
                    });
            });
        }

        const fixPlate = () => {
            return new Promise((resolve, reject) => {
                plate = translit(plate);

                if (!plate) {
                    warning = true;
                    res.send({ err: 'Не верный формат номера!' });
                    return reject(false);
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
                            warning = true;
                            res.send({ err: 'Не удалось добавить запись!' });
                            return reject(err);
                        }

                        if (result.length !== 0) {
                            isCarExist = true;
                            idCar = result[0].id_car;
                        }
                        return resolve(result);
                    }
                );
            });
        }

        const CheckDateExpired = () => {
            return new Promise((resolve, reject) => {
                db.query(
                    "SELECT id_car FROM car WHERE id_car=? AND expiration_date < CURDATE()",
                    [idCar], (err, result) => {

                        if (err) {
                            warning = true;
                            res.send({ err: 'Не удалось добавить запись!' });
                            return reject(err);
                        }

                        if (result.length === 0) {
                            isCarExpired = false;
                            res.send({ err: 'У автомобиля уже есть доступ к данной проходной!' });
                        }
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
                            warning = true;
                            res.send({ err: 'Не удалось добавить запись!' });
                            return reject(err);
                        }

                        res.send({ message: 'Данные о правах доступа успешно обновлены!' });
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
                            warning = true;
                            res.send({ err: 'Не удалось добавить запись!' });
                            return reject(err);
                        }

                        idCar = result.insertId;
                        return resolve(result);
                    });
            });
        }

        let addGates = () => {
            return new Promise((resolve, reject) => {
                db.query(
                    "INSERT INTO gates_allowed (id_car, id_gates) VALUES (?, ?)",
                    [idCar, idGates], (err, result) => {
                        if (err) {
                            return reject(err);
                        }

                        res.send({ message: 'Запись успешно добавлена!' });
                        return resolve(result);
                    });
            });
        }

        async function CarAdding() {

            try {
                await getIdGates();
                if (!warning)
                    await fixPlate();
                if (!warning)
                    await checkCarExist();
                if (!warning && isCarExist)
                    await CheckDateExpired();
                if (!warning && isCarExist && isCarExpired)
                    await updateDate();
                if (!warning && !isCarExist)
                    await addCar();
                if (!warning && !isCarExist)
                    await addGates();

            } catch (error) {
                res.send({ err: 'Не удалось добавить запись!' });
            }
        }
        CarAdding();
    });
}
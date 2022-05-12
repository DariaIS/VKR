const fs = require('fs');
const translit = require('../../functions/translitRuEn');

module.exports = function (app, db) {

    app.post('/inOutCar', (req, res) => {
        const direction = req.body.direction;

        let plate = req.query.plate;
        if (!plate)
            plate = fs.readFileSync("car.txt", "utf8").toString().split("\n");
        else {
            plate = plate.split(',');
        }
            // console.log(plate);
        let log = [];
        if (req.session.log)
            log = req.session.log;

        if (plate[0].trim().length < 6) {
            log.push(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' Номер автомобиля не распознан');
            req.session.log = log;
            res.send({ log: log, carPlateErr: 'Номер машины не распознан!' });
        }
        else {
            let warning = false;
            let idCar, idDate;
            let idGates = '1';

            plate[0] = translit(plate[0].trim());

            let CheckCarInOut = () => {
                return new Promise((resolve, reject) => {
                    db.query(
                        "SELECT id_car, expiration_date FROM car WHERE license_plate=?",
                        [plate[0]], (err, result) => {
                            if (err) {
                                console.log(err);
                                return reject(err);
                            }
                            else {
                                if (result.length === 0) {
                                    log.push(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' Автомобиль с номером ' + plate[0] + ' отсутствует в базе данных');
                                    req.session.log = log;
                                    res.send({ log: log, err: 'Машины с данным номером нет в базе данных!' });
                                    warning = true;
                                }
                                else {
                                    let expDate = new Date(result[0].expiration_date);
                                    expDate.setDate(expDate.getDate() + 1);
                                    if (new Date() < expDate) {
                                        idCar = result[0].id_car;
                                    }
                                    else {
                                        warning = true;
                                        log.push(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' У автомобиля с номером ' + plate[0] + ' истекли права доступа');
                                        req.session.log = log;
                                        res.send({ log: log, err: 'У данного автомобиля истекли права доступа!' });
                                    }
                                }
                                return resolve(result);
                            }
                        }
                    );
                });
            }

            let CheckRightGates = () => {
                return new Promise((resolve, reject) => {
                    db.query(
                        "SELECT * FROM gates_allowed WHERE id_car=? AND id_gates=?",
                        [idCar, idGates], (err, result) => {
                            if (err) {
                                console.log(err);
                                return reject(err);
                            } else {
                                if (result.length === 0) {
                                    log.push(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' Автомобиль с номером ' + plate[0] + ' не имеет доступа к данной проходной');
                                    req.session.log = log;
                                    res.send({ log: log, err: 'У машины с данным номером нет доступа к этой проходной!' });
                                    warning = true;
                                }
                                return resolve(result);
                            }
                        }
                    );
                });
            }

            let AddDate = () => {
                return new Promise((resolve, reject) => {
                    db.query(
                        "SELECT id_date FROM date WHERE date=CURDATE()",
                        (err, result) => {
                            if (err) {
                                console.log(err);
                                return reject(err);
                            } else {
                                if (result.length === 0) {
                                    db.query(
                                        "INSERT INTO date (date) VALUES (CURDATE())",
                                        (err, result) => {
                                            if (err) {
                                                console.log(err)
                                            } else idDate = result.insertId;
                                        });
                                }
                                else {
                                    idDate = result[0].id_date;
                                }
                                return resolve(result);
                            }
                        }
                    );
                });
            }

            let CheckAddArrDate = () => {
                return new Promise((resolve, reject) => {
                    db.query(
                        "SELECT * FROM arriving_date WHERE id_date=? AND id_car=?",
                        [idDate, idCar], (err, result) => {
                            if (err) {
                                console.log(err);
                                return reject(err);
                            }
                            else {
                                if (result.length === 0) {
                                    db.query(
                                        "INSERT INTO arriving_date (id_date, id_car) VALUES (?, ?)",
                                        [idDate, idCar]);
                                }
                                return resolve(result);
                            }
                        }
                    );
                });
            }

            let AddCarInOut = () => {
                return new Promise((resolve, reject) => {

                    if (direction === 'in') {
                        db.query(
                            "UPDATE arriving_date SET arrival_time=CURTIME(), departure_time=NULL WHERE id_date=? AND id_car=?",
                            [idDate, idCar], (err, result) => {

                                if (err) {
                                    console.log(err);
                                    return reject(err);
                                } else {
                                    log.push(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' Автомобиль c номером ' + plate[0] + ' въехал');
                                    req.session.log = log;
                                    res.send({ log: log, message: 'Машина может быть пропущена!' });
                                    return resolve(result);
                                }
                            });
                    }
                    else {
                        db.query(
                            "UPDATE arriving_date SET departure_time=CURTIME() WHERE id_date=? AND id_car=?",
                            [idDate, idCar], (err, result) => {

                                if (err) {
                                    console.log(err);
                                    return reject(err);
                                }
                                else {
                                    log.push(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' Автомобиль c номером ' + plate[0] + ' выехал');
                                    req.session.log = log;
                                    res.send({ log: log });
                                    return resolve(result);
                                }
                            })
                    }
                });
            }

            async function CarInOut() {

                try {
                    await CheckCarInOut();
                    if (!warning)
                        await CheckRightGates();
                    if (!warning)
                        await AddDate();
                    if (!warning)
                        await CheckAddArrDate();
                    if (!warning)
                        await AddCarInOut();
                } catch (error) {
                    console.log(error)
                }
            }

            CarInOut();
        }
    });
}
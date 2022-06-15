const fs = require('fs');
const { execFileSync } = require('child_process');

const translit = require('../../functions/translitRuEn');

module.exports = function (app, db) {

    app.post('/inOutCar', (req, res) => {
        // получение направление движения автомобиля из тела запроса
        const direction = req.body.direction;
        // получение номера автомобиля из пути
        let plate = req.query.plate;
        // если в пути не был указан номер, то запуск исполняемого файла, 
        // и чтение номера из сформированного входного файла
        if (!plate) {
            execFileSync('tempExe.exe', []);
            plate = fs.readFileSync('car.txt', 'utf8').toString().split("\n");
        }
        else {
            // если номер в пути есть, то преобразование в массив,
            // где нулевой элемент - номер, первый - регион
            plate = plate.split(',');
        }
        console.log(direction);
        let log = [];
        // чтение лог из cookies
        if (req.session.log)
            log = req.session.log;

        console.log(plate);

        // если нулевой элемент массива - код ошибки
        // то соответствующее сообщение добавляется в логи и посылается
        if (plate[0].trim() === '404') {
            log.push(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' Номер автомобиля не распознан');
            req.session.log = log;
            res.send({ log: log, carPlateErr: 'Номер автомобиля не распознан!' });
        }
        else {
            let warning = false;
            let idCar, idDate;
            let idGates = '1';

            // преобразование номера в необходимый вид
            plate[0] = translit(plate[0].trim());

            // функция, выполняющая поиск записи с данным номером и регионом в БД
            let CheckCarInOut = () => {
                return new Promise((resolve, reject) => {
                    db.query(
                        "SELECT id_car, expiration_date FROM car WHERE license_plate = ? AND region = ?",
                        [plate[0], plate[1]], (err, result) => {
                            if (err) {
                                console.log(err);
                                return reject(err);
                            }
                            else {
                                // если запись не найдена, то посылается соответсвующее сообщение
                                if (result.length === 0) {
                                    log.push(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' Автомобиль с номером ' + plate[0] + ' ' + plate[1] + ' отсутствует в базе данных');
                                    req.session.log = log;
                                    warning = true;
                                    if (direction === 'in') {
                                        res.send({ log: log, err: 'Автомобиля с данным номером нет в базе данных!' });
                                    } else res.send({ log: log });
                                }
                                else {
                                    // если запись найдена, то проверяется дата истечения прав доступа
                                    let expDate = new Date(result[0].expiration_date);
                                    expDate.setDate(expDate.getDate() + 1);
                                    if (new Date() < expDate) {
                                        idCar = result[0].id_car;
                                    }
                                    else {
                                        warning = true;
                                        log.push(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' У автомобиля с номером ' + plate[0] + ' ' + plate[1] + ' истекли права доступа');
                                        req.session.log = log;
                                        if (direction === 'in') {
                                            res.send({ log: log, err: 'У данного автомобиля истекли права доступа!' });
                                        } else res.send({ log: log });
                                    }
                                }
                                return resolve(result);
                            }
                        }
                    );
                });
            }

            // функция, проверяющая есть ли у автомобиля доступ к данному КПП
            let CheckRightGates = () => {
                return new Promise((resolve, reject) => {
                    db.query(
                        "SELECT * FROM gates_allowed WHERE id_car = ? AND id_gates = ?",
                        [idCar, idGates], (err, result) => {
                            if (err) {
                                console.log(err);
                                return reject(err);
                            } else {
                                // если не найдена запись с данным составмым ключом в таблице gates_allowed
                                // то есть у автомобиля отсутствует доступ к КПП, то отправляется соответствующее сообщение
                                if (result.length === 0) {
                                    warning = true;
                                    log.push(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' Автомобиль с номером ' + plate[0] + ' ' + plate[1] + ' не имеет доступа к данной проходной');
                                    req.session.log = log;
                                    if (direction === 'in') {
                                        res.send({ log: log, err: 'У автомобиля с данным номером нет доступа к этой проходной!' });
                                    } else res.send({ log: log });
                                }
                                return resolve(result);
                            }
                        }
                    );
                });
            }

            // добавление сегодняшнего дня в таблицу дат
            let AddDate = () => {
                return new Promise((resolve, reject) => {
                    // поиск записи для сегодняшнего дня
                    db.query(
                        "SELECT id_date FROM `date` WHERE `date` = CURDATE()",
                        (err, result) => {
                            if (err) {
                                console.log(err);
                                return reject(err);
                            } else {
                                // если запись не найдена, то она создается
                                if (result.length === 0) {
                                    db.query(
                                        "INSERT INTO `date` (`date`) VALUES (CURDATE())",
                                        (err, result) => {
                                            if (err) {
                                                console.log(err)
                                                // idDate - первичный ключ добавленной записи
                                            } else idDate = result.insertId;
                                        });
                                }
                                else {
                                    // если запись найдена, то idDate - первичный ключ найденной записи
                                    idDate = result[0].id_date;
                                }
                                return resolve(result);
                            }
                        }
                    );
                });
            }

            // функция поиска и добавления записи о въезде автомобиля в данный днь
            let CheckAddArrDate = () => {
                return new Promise((resolve, reject) => {
                    db.query(
                        "SELECT * FROM arriving_date WHERE id_date = ? AND id_car = ?",
                        [idDate, idCar], (err, result) => {
                            if (err) {
                                console.log(err);
                                return reject(err);
                            }
                            else {
                                // если запись не найдена, то есть автомобиль не въезжал
                                // и не выезжал сегодня то запись добавляется
                                if (result.length === 0) {
                                    db.query(
                                        "INSERT INTO arriving_date (id_date, id_car) VALUES (?, ?)",
                                        [idDate, idCar]
                                    );
                                }
                                return resolve(result);
                            }
                        }
                    );
                });
            }

            // функция обновления значений записи о въезде или выезде
            let AddCarInOut = () => {
                return new Promise((resolve, reject) => {
                    // если автомобиль въезжает, то обновление значения времени въезда
                    if (direction === 'in') {
                        db.query(
                            "UPDATE arriving_date SET arrival_time=CURTIME(), departure_time=NULL WHERE id_date=? AND id_car=?",
                            [idDate, idCar], (err, result) => {

                                if (err) {
                                    console.log(err);
                                    return reject(err);
                                } else {
                                    console.log(direction);
                                    log.push(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' Автомобиль c номером ' + plate[0] + ' ' + plate[1] + ' въехал');
                                    req.session.log = log;
                                    res.send({ log: log, message: 'Автомобиль может быть пропущен!' });
                                    return resolve(result);
                                }
                            }
                        );
                    }
                    else {
                        // если автомобиль выезжает, то обновление значения времени выезда
                        db.query(
                            "UPDATE arriving_date SET departure_time=CURTIME() WHERE id_date = ? AND id_car = ?",
                            [idDate, idCar], (err, result) => {

                                if (err) {
                                    console.log(err);
                                    return reject(err);
                                }
                                else {
                                    log.push(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' Автомобиль c номером ' + plate[0] + ' ' + plate[1] + ' выехал');
                                    req.session.log = log;
                                    res.send({ log: log });
                                    return resolve(result);
                                }
                            }
                        )
                    }
                });
            }

            async function CarInOut() {

                try {
                    // поиск автомобиля в БД
                    await CheckCarInOut();
                    // проверка прав на проезд через КПП
                    if (!warning)
                        await CheckRightGates();
                    // добавление записи о сегодняшнем дне
                    if (!warning)
                        await AddDate();
                    // добавление записи о въезде (выезде)
                    if (!warning)
                        await CheckAddArrDate();
                    // обновление значений времени въезда (выезда)
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
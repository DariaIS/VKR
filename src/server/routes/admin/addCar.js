const translit = require('../../functions/translitRuEn');

module.exports = function (app, db) {

    app.post("/addCar", (req, res) => {
        // получение введенных данных из тела запроса
        let plate = req.body.plate;
        const region = req.body.region;
        const brand = req.body.brand;
        const idGates = '1';

        let idCar;
        let isCarAlreadyExist = false;
        let isCarExpired = false;
        let hasGates = false;

        // функция, преобразующая автомобильный номер, в нужный вид
        const fixPlate = () => {
            return new Promise((resolve, reject) => {
                plate = translit(plate);
                if (!plate) {

                    return reject('Неверный формат номера!');
                }

                return resolve(plate);
            });
        }

       // функция, определяющая, есть ли в базе даных 
       // записи с введенном номером автомобиля
        const checkCarExist = () => {
            return new Promise((resolve, reject) => {
                db.query(
                    "SELECT id_car, expiration_date FROM car WHERE license_plate=? AND region=?",
                    [plate, region], (err, result) => {
                        if (err) {
                            console.log(err);
                            return reject('Произошла ошибка. Пожалуйста, попробуйте снова позже!');
                        }

                        // есть запись найдена, то в переменную idCar записывается id найденной записи
                        // isCarAlreadyExist = true, то есть запись об автомобиле уже существует
                        if (result.length !== 0) {
                            isCarAlreadyExist = true;
                            idCar = result[0].id_car;
                            
                            // если дата истечения предоставления доступа истекла, то isCarExpired = true
                            if (new Date(result[0].expiration_date) < new Date())
                                isCarExpired = true;
                        }
                        return resolve(result);
                    }
                );
            });
        }

        // функция, добавляющая запись об автомобиле в БД 
        const addCar = () => {
            return new Promise((resolve, reject) => {
                db.query(
                    "INSERT INTO car (car_brand, license_plate, region, start_date, expiration_date) VALUES (?, ?, ?, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 YEAR))",
                    [brand, plate, region], (err, result) => {
                        if (err) {
                            console.log(err);
                            return reject('Произошла ошибка. Пожалуйста, попробуйте снова позже!');
                        }

                        // присвоение переменной idCar значение ключа только что добавленной записи
                        idCar = result.insertId;
                        return resolve(result);
                    });
            });
        }

        // функция, проверяющая есть ли у автомобиля доступ к КПП
        const checkGates = () => {
            return new Promise((resolve, reject) => {
                db.query(
                    "SELECT * FROM gates_allowed WHERE id_car = ? AND id_gates = ? ",
                    [idCar, idGates], (err, result) => {
                        if (err) {
                            console.log(err);
                            return reject('Произошла ошибка. Пожалуйста, попробуйте снова позже!');
                        }

                        // если найдена запись с данным составмым ключом в таблице gates_allowed
                        // то есть у автомобиля есть доступ к КПП и права не истекли, то отправляется
                        // соответствующее сообщение и hasGates = true
                        if (result.length !== 0) {
                            hasGates = true;
                            if (!isCarExpired)
                                res.send({ err: 'У автомобиля уже есть доступ к данной проходной!' });
                        }
                        return resolve(result);
                    });
            });
        }

        // функция, добавляющая запись о разрешенных автомобилю КПП для въезда
        const addGates = () => {
            return new Promise((resolve, reject) => {
                db.query(
                    "INSERT INTO gates_allowed (id_car, id_gates) VALUES (?, ?)",
                    [idCar, idGates], (err, result) => {
                        if (err) {
                            console.log(err);
                            return reject('Произошла ошибка. Пожалуйста, попробуйте снова позже!');
                        }

                        // если запись об автомобиле уже была в базе данных, права доступа не истекли,
                        // но не было доступа к данной КПП, то отправляется соответсвующее сообщение
                        if (isCarAlreadyExist) {
                            if (!isCarExpired)
                                res.send({ message: 'Автомобилю предоставлен доступ к данной проходной!' });
                        } else res.send({ message: 'Запись успешно добавлена!' });
                        return resolve(result);
                    });
            });
        }

        // функция, обновляющая права доступа
        const updateDate = () => {
            return new Promise((resolve, reject) => {
                db.query(
                    "UPDATE car SET expiration_date = DATE_ADD(CURDATE(), INTERVAL 1 YEAR) WHERE id_car=?",
                    [idCar], (err, result) => {
                        if (err) {
                            console.log(err);
                            return reject('Произошла ошибка. Пожалуйста, попробуйте снова позже!');
                        }

                        // в зависимости от того, были ли у автомобиля права доступа к даннной проходной
                        // или нет, отправляется соответствующее сообщение
                        if (!hasGates)
                            res.send({ message: 'Дата истечения прав доступа обновлена, автомобилю предоставлен доступ к данной проходной!' });
                        else res.send({ message: 'Дата истечения прав доступа успешно обновлена!' });
                        return resolve(result);
                    });
            });
        }


        // констукция async/await для выполнения асинхронных запросов
        async function CarAdding() {

            try {
                // преобразование номера
                await fixPlate();
                //существует ли запись об автомобиле
                await checkCarExist();
                // если существует, то проверки того, есть ли доступ к КПП
                if (isCarAlreadyExist)
                    await checkGates();
                // если не существует, то добавление записи
                if (!isCarAlreadyExist)
                    await addCar();
                // если у автомобиля нет доступа к КПП
                if (!hasGates)
                    await addGates();
                // обновление даты предоставления доступа, если она истекла
                if (isCarExpired)
                    await updateDate();

            } catch (error) {
                res.send({ err: error });
            }
        }
        CarAdding();
    });
}
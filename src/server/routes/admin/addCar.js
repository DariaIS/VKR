const translit = require('../../functions/translitRuEn');

module.exports = function(app, db) {

    app.post("/addCar", (req, res) => {
        if (req.body.plate === '' || req.body.region === '' || req.body.brand === '' || req.body.lastName === '' || req.body.name === '' || req.body.middleName === '' || req.body.chair === '' || req.body.gates === '' || req.body.position === '')
            res.send({ message: 'Не все поля заполнены!' });
        else if (!Number.isInteger(parseInt(req.body.region, 10)) || req.body.region === "0") {
            res.send({ message: 'Введен неверный регион!' });
            // console.log(Number.isInteger(parseInt(req.body.region, 10)));
            // console.log(req.body.region);
        }
        else {
            let plate = req.body.plate;
            const region = req.body.region;
            const brand = req.body.brand;
            const lastName = req.body.lastName;
            const name = req.body.name;
            const middleName = req.body.middleName;
            const chair = req.body.chair;
            const position = req.body.position;
            const gates = req.body.gates;
    
            let idPerson, idCar, idGates;
            let warning = false;
            let interval;
    
            if (position === "student")
                interval = "1";
            else interval = "5";
    
    
            let CheckGates = () => {
                return new Promise((resolve, reject) => {
                    db.query(
                        "SELECT id_gates FROM gates WHERE gates_name=?",
                        [gates], (err, result) => {
                            if (result.length === 0) {
                                console.log(gates)
                                // console.log(result.length + " такой проходной нет")
                                res.send({ message: 'Введенной вами проходной не существует!' });
                                warning = true;
                            }
                            else {
                                idGates = result[0].id_gates;
                                // console.log(result.length + " проходная есть");
                            }
    
    
                            if (err) {
                                return reject(err);
                            }
                            return resolve(result);
                        });
                });
            }
    
            let TranslitPlate = () => {
                return new Promise((resolve, reject) => {
    
                    plate = translit(plate);
                    console.log(plate)
    
                    if (!plate) {
                        return reject(false);
                    }
                    return resolve(plate);
                });
            }
    
            let CheckCar = () => {
                return new Promise((resolve, reject) => {
                    db.query(
                        "SELECT * FROM car WHERE license_plate=? AND region=?",
                        [plate, region], (err, result) => {
                            if (result.length !== 0) {
                                // console.log(result.length + " машина уже есть")
                                res.send({ message: 'Машина с веденным номером уже есть в базе данных!' });
                                warning = true;
                            }
                            else {
                                // console.log(result.length + " такой машины нет");
                            }
    
                            if (err) {
                                return reject(err);
                            }
                            return resolve(result);
                        });
                });
            }
    
            let CheckPerson = () => {
                return new Promise((resolve, reject) => {
                    db.query(
                        "SELECT id_person FROM person WHERE last_name=? AND name=? AND middle_name=? AND chair=? AND position=?",
                        [lastName, name, middleName, chair, position], (err, result) => {
    
                            if (result.length !== 0) {
                                idPerson = result[0].id_person;
                                // console.log(idPerson + " такой человек есть");
                                // console.log(warning);
                            }
    
                            if (err) {
                                return reject(err);
                            }
                            return resolve(result);
                        });
                });
            }
    
            let AddPerson = () => {
                return new Promise((resolve, reject) => {
                    // console.log("AddPerson");
                    db.query(
                        "INSERT INTO person (last_name, name, middle_name, chair, position) VALUES (?, ?, ?, ?, ?)",
                        [lastName, name, middleName, chair, position], (err, result) => {
                            idPerson = result.insertId;
                            // console.log(idPerson + " человек добавлен")
    
                            if (err) {
                                return reject(err);
                            }
                            return resolve(result);
                        });
                    // console.log(warning);
                    // console.log(idPerson);
                });
            }
    
            let AddCar = () => {
                return new Promise((resolve, reject) => {
    
                    // console.log("AddCar");
                    // console.log(idPerson);
                    // console.log(brand);
                    // console.log(plate);
                    // console.log(interval);
    
                    db.query(
                        "INSERT INTO car (id_person, car_brand, license_plate, region, start_date, expiration_date) VALUES (?, ?, ?, ?, CURDATE(), DATE_ADD(CURDATE(), INTERVAL ? YEAR))",
                        [idPerson, brand, plate, region, interval], (err, result) => {
    
                            idCar = result.insertId;
                            // console.log(idCar + " машина добавлена")
    
                            if (err) {
                                return reject(err);
                            }
                            return resolve(result);
                        });
                });
            }
    
            let AddGates = () => {
                return new Promise((resolve, reject) => {
    
                    console.log("AddGates");
                    db.query(
                        "INSERT INTO gates_allowed (id_car, id_gates) VALUES (?, ?)",
                        [idCar, idGates], (err, result) => {
                            res.send({ message: 'Запись успешно добавлена!' });
                            console.log(result + " запись добавлена")
    
                            if (err) {
                                return reject(err);
                            }
                            return resolve(result);
                        });
                });
            }
    
            async function CarAdding() {
    
                try {
                    await CheckGates();
                    if (!warning)
                        await TranslitPlate();
                    if (!warning)
                        await CheckCar();
                    if (!warning)
                        await CheckPerson();
                    if (typeof idPerson === 'undefined' && !warning)
                        await AddPerson();
                    if (!warning)
                        await AddCar();
                    if (!warning)
                        await AddGates();
    
                } catch (error) {
                    console.log(error)
                }
            }
            CarAdding();
        }
    });
}
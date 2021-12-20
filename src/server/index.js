const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: ['http://localhost:3000'],
        methods: ['GET', "POST"],
        credentials: true,
    })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
        key: 'userId',
        secret: 'subscribe',
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24,
        },
    })
);

const db = mysql.createConnection({
    host: "127.0.0.1",
    port: '3306',
    user: 'root',
    database: "vkr",
});

db.connect(function (err) {
    if (err) {
        return console.error("Ошибка: " + err.message);
    }
    else {
        console.log("CONNECTED TO mySQL SERVER SUCCESSFULLY \n");
    }
});

app.get('/login', (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else
        res.send({ loggedIn: false });
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [username, password],
        (err, result) => {
            if (err)
                res.send({ err: err });

            if (result.length > 0) {
                req.session.user = result;
                res.send(result);
            } else
                res.send( { message: 'Неверный логин или пароль!' });
        }
    );
});

app.get('/logout', (req, res) => {
    req.session.loggedIn = false;
    delete req.session.user;
    res.send({ loggedIn: false, user: req.session.user });
});

function translitRuEn(lit) {
    let letters = [
       ["а","A"],
       ["a","A"],
       ["А","A"],
       ["в","B"],
       ["В","B"],
       ["е","E"],
       ["e","E"],
       ["к","K"],
       ["К","K"],
       ["м","M"],
       ["М","M"],
       ["н","H"],
       ["Н","H"],
       ["о","O"],
       ["o","O"],
       ["О","O"],
       ["р","P"],
       ["p","P"],
       ["Р","P"],
       ["с","C"],
       ["c","C"],
       ["С","C"],
       ["т","T"],
       ["Т","T"],
       ["у","y"],
       ["У","y"],
       ["х","X"],
       ["x","X"],
       ["Х","X"],
    ]

    let result = lit;

    for (let i = 0; i < lit.length; i++) {
        for (let j = 0; j < letters.length; j++) {
            if (lit[i] == letters[j][0]) {
                result = result.replace(result[i], letters[j][1]);
            }
        }
    }

    return result;
}

app.post("/add", (req, res) => {
    if (req.body.plate === '' || req.body.brand === '' || req.body.name === '' || req.body.chair === '' || req.body.gates === '' || req.body.space === '')
        res.send( { message: 'Не все поля заполнены!' });
    else {
        let plate = req.body.plate;
        const brand = req.body.brand;
        const name = req.body.name;
        const chair = req.body.chair;
        const gates = req.body.gates;
        const space = req.body.space;
        
        let idPerson, idParkingSpace, idCar, idGates, currentParkingSpace;
        let warning = false;

        let IfGates = () => {
            return new Promise((resolve, reject) => {
                db.query(
                    "SELECT id_gates FROM gates WHERE gates_name=?",
                    [gates], (err, result) => {
                        if (result.length === 0) {
                            res.send( { message: 'Введенной вами проходной не существует!' }); 
                            warning = true;
                        }
                        else idGates = result[0].id_gates;

                        if(err) {
                            return reject(error);
                        }
                        return resolve(result);                                           
                });
            });
        }

        let TranslitPlate = () => {
            return new Promise((resolve, reject) => {

                plate = translitRuEn(plate);
                                        
                if(!plate) {
                    return reject(false);
                }
                return resolve(plate);      
            });
        }

        let IfCar = () => {
            return new Promise((resolve, reject) => {
                db.query(
                    "SELECT * FROM car WHERE license_plate=?",
                    [plate], (err, result) => {
                        if (result.length != 0) {
                            res.send( { message: 'Машина с веденным номером уже есть в базе данных!' }); 
                            warning = true;
                        }
                        
                        if(err) {
                            return reject(error);
                        }
                        return resolve(result);                                           
                });
            });
        }

        let IfParkingPlace = () => {
            return new Promise((resolve, reject) => {
                db.query(
                    "SELECT id_parking_space FROM parking_space WHERE parking_space_number=?",
                    [space], (err, result) => {
                        if (result.length === 0) {
                            res.send( { message: 'Введенное вами парковочное место не существует!' });
                            warning = true;
                        }
                        else currentParkingSpace = result[0].id_parking_space;
                        
                        if(err) {
                            return reject(error);
                        }
                        return resolve(result);                                           
                });
            });
        }

        let ResParkingPlace = () => {
            return new Promise((resolve, reject) => {
                db.query(
                    "SELECT * FROM car WHERE id_parking_space=?",
                    [currentParkingSpace], (err, result) => {
                        
                        if (result.length != 0) {
                            res.send( { message: 'Данное парковочное место занято!' });                                            
                            warning = true;
                        }
                        else idParkingSpace = currentParkingSpace;
                        
                        if(err) {
                            return reject(error);
                        }
                        return resolve(result);       
                });

                                    
            });
        }

        let IfPerson = () => {
            return new Promise((resolve, reject) => {
                db.query(
                    "SELECT id_person FROM person WHERE full_name=? AND chair=?",
                    [name, chair], (err, result) => {
                        
                        if (result.length != 0) {
                            idPerson = result[0].id_person;
                        }
                        
                        if(err) {
                            return reject(error);
                        }
                        return resolve(result);       
                });                     
            });
        }
        
        let ResPerson = () => {
            return new Promise((resolve, reject) => {
                if (typeof idPerson === 'undefined')
                    db.query(
                        "INSERT INTO person (full_name, chair) VALUES (?, ?)",
                        [name, chair], (err, result) => {
                            idPerson = result.insertId;

                            if(err){
                                return reject(error);
                            }
                            return resolve(result);
                    });
            });
        }

        let ResCar = () => {
            return new Promise((resolve, reject) => {

                console.log(idPerson)
                console.log(idParkingSpace)
                console.log(brand)
                console.log(plate)
                
                db.query(
                    "INSERT INTO car (id_person, id_parking_space, car_brand, license_plate, start_date, expiration_date) VALUES (?, ?, ?, ?, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 YEAR))",
                    [idPerson, idParkingSpace, brand, plate], (err, result) => {
                        console.log(err)

                        idCar = result.insertId;

                        if(err){
                            return reject(error);
                        }
                        return resolve(result);
                });
            });
        }

        let ResGates = () => {
            return new Promise((resolve, reject) => {

                db.query(
                    "INSERT INTO gates_allowed (id_car, id_gates) VALUES (?, ?)",
                    [idCar, idGates], (err, result) => {
                        res.send( { message: 'Запись успешно добавлена!' });

                        if(err){
                            return reject(error);
                        }
                        return resolve(result);
                });
            });
        }

        async function Checking() {
 
            try {
                await IfGates();
                if (!warning)
                    await TranslitPlate();
                if (!warning)
                    await IfCar();
                if (!warning)
                    await IfParkingPlace();
                if (!warning)
                    await ResParkingPlace();
                if (!warning)
                    await IfPerson();
                if (!warning)
                    await ResPerson();
                if (!warning)
                    await ResCar();
                if (!warning)
                    await ResGates();
                                
            } catch(error){
                console.log(error)
            }
        }

        Checking();

    }
});

app.get('/car', (req, res) => {
    let carCheck = fs.readFileSync("car.txt", "utf8").toString().split("\n");

    if (carCheck.length === 1)
        res.send( { message: 'Номер машины не распознан!' });
    else {
        carCheck[0] = translitRuEn(carCheck[0].trim());
        let warning = false;
        let idCar, idDay;
        let idGates = '1';

        let IfCarCheck = () => {
            return new Promise((resolve, reject) => {

                db.query(
                    "SELECT id_car FROM car WHERE license_plate=?",
                    [carCheck[0]], (err, result) => {
                        if (result.length === 0) {
                            res.send( { message: 'Машины с данным номером нет в базе данных!' }); 
                            warning = true;
                        }
                        else idCar = result[0].id_car;

                        if(err){
                            return reject(error);
                        }
                        return resolve(result);
                });
            });
        }

        let IfThisGates = () => {
            return new Promise((resolve, reject) => {

                db.query(
                    "SELECT * FROM gates_allowed WHERE id_car=? AND id_gates=?",
                    [idCar, idGates], (err, result) => {
                        if (result.length === 0) {
                            res.send( { message: 'У машины с данным номером нет доступа к этой проходной!' }); 
                            warning = true;
                        }

                        if(err){
                            return reject(error);
                        }
                        return resolve(result);
                });
            });
        }

        let ResDay = () => {
            return new Promise((resolve, reject) => {

                db.query(
                    "SELECT id_day FROM day WHERE day=CURDATE()",
                    (err, result) => {

                        if (result.length === 0){
                            db.query(
                                "INSERT INTO day (day) VALUES (CURDATE())",
                                (err, result) => {
                                    idDay = result.insertId;
                                    console.log(idDay)
                            });
                        }
                        else {
                            idDay = result[0].id_day;
                        }
                            

                        if(err){
                            return reject(error);
                        }
                        return resolve(result);
                    }
                );
            });
        }

        let IfArrivingDay = () => {
            return new Promise((resolve, reject) => {

                db.query(
                    "SELECT * FROM arriving_day WHERE id_day=? AND id_car=?",
                    [idDay, idCar], (err, result) => {

                        if (result.length === 0) {
                            db.query(
                                "INSERT INTO arriving_day (id_day, id_car) VALUES (?, ?)",
                                [idDay, idCar]);
                        }

                        if(err){
                            return reject(error);
                        }
                        return resolve(result);
                });
            });
        }

        let ResCarCheck = () => {
            return new Promise((resolve, reject) => {

                if (carCheck[1] === '1')
                    db.query(
                        "UPDATE arriving_day SET arrival_time=CURTIME() WHERE id_day=? AND id_car=?",
                        [idDay, idCar], (err, result) => {

                            if(err){
                                return reject(error);
                            }
                            return resolve(result);
                    });
                else 
                    db.query(
                        "UPDATE arriving_day SET departure_time=CURTIME() WHERE id_day=? AND id_car=?",
                        [idDay, idCar], (err, result) => {

                            if(err){
                                return reject(error);
                            }
                            return resolve(result);
                    });

                res.send( { message: 'Машина может быть пропущена!' });   
            });
        }

        
        async function Checking() {
 
            try {
                await IfCarCheck();
                if (!warning)
                    await IfThisGates();
                if (!warning)
                    await ResDay();
                if (!warning)
                    await IfArrivingDay();
                if (!warning)
                    await ResCarCheck();
                                
            } catch(error){
                console.log(error)
            }
        }

        Checking();

    }

});

app.get('/cartable', (req, res) => {
    db.query("SELECT * FROM car INNER JOIN person ON person.id_person INNER JOIN parking_space ON parking_space.id_parking_space WHERE person.id_person=car.id_person AND parking_space.id_parking_space=car.id_parking_space", (err, result) => {
        result.forEach(element => {
            console.log(element.start_date)
        });
        res.send({ result });
        console.log(err)
    });
});

app.listen(3001, () => {
    console.log("SERVER RUNNING ON PORT 3001");
});


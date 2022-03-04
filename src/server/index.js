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
            expires: 60 * 1000 * 10, // 60 * 1000 - минута
        },
    }
    )
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
        "SELECT * FROM user WHERE user_name = ? AND password = ?",
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

app.post("/addCar", (req, res) => {
    if (req.body.plate === '' || req.body.region === '' || req.body.brand === '' || req.body.lastName === '' || req.body.name === '' || req.body.middleName === '' || req.body.chair === '' || req.body.gates === '' || req.body.position === '')
        res.send( { message: 'Не все поля заполнены!' });
    else if (!Number.isInteger(parseInt(req.body.region, 10)) || req.body.region === "0") {
        res.send( { message: 'Введен неверный регион!' });
        console.log(Number.isInteger(parseInt(req.body.region, 10)));
        console.log(req.body.region);
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

        console.log("\n");
        if (position === "student")
            interval = "1";
        else interval = "5";


        let CheckGates = () => {
            return new Promise((resolve, reject) => {
                db.query(
                    "SELECT id_gates FROM gates WHERE gates_name=?",
                    [gates], (err, result) => {
                        if (result.length === 0) {
                            console.log(result.length + " такой проходной нет")
                            res.send( { message: 'Введенной вами проходной не существует!' }); 
                            warning = true;
                        }
                        else  {
                            idGates = result[0].id_gates;
                            console.log(result.length + " проходная есть");
                        }
                        

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

        let CheckCar = () => {
            return new Promise((resolve, reject) => {
                db.query(
                    "SELECT * FROM car WHERE license_plate=? AND region=?",
                    [plate, region], (err, result) => {
                        if (result.length != 0) {
                            console.log(result.length + " машина уже есть")
                            res.send( { message: 'Машина с веденным номером уже есть в базе данных!' }); 
                            warning = true;
                        }
                        else console.log(result.length + " такой машины нет");
                        
                        if(err) {
                            return reject(error);
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
                        
                        if (result.length != 0) {
                            idPerson = result[0].id_person;
                            console.log(idPerson + " такой человек есть");
                            console.log(warning);
                        }
                        
                        if(err) {
                            return reject(error);
                        }
                        return resolve(result);       
                });                     
            });
        }
        
        let AddPerson = () => {
            return new Promise((resolve, reject) => {
                console.log("AddPerson");
                db.query(
                    "INSERT INTO person (last_name, name, middle_name, chair, position) VALUES (?, ?, ?, ?, ?)",
                    [lastName, name, middleName, chair, position], (err, result) => {
                        idPerson = result.insertId;
                        console.log(idPerson + " человек добавлен")
                        
                        if(err){
                            return reject(error);
                        }
                        return resolve(result);
                });
                console.log(warning);
                console.log(idPerson);
            });
        }

        let AddCar = () => {
            return new Promise((resolve, reject) => {

                console.log("AddCar");
                console.log(idPerson);
                console.log(brand);
                console.log(plate);
                console.log(interval);
                
                db.query(
                    "INSERT INTO car (id_person, car_brand, license_plate, region, start_date, expiration_date) VALUES (?, ?, ?, ?, CURDATE(), DATE_ADD(CURDATE(), INTERVAL ? YEAR))",
                    [idPerson, brand, plate, region, interval], (err, result) => {

                        idCar = result.insertId;
                        console.log(idCar + " машина добавлена")

                        if(err){
                            return reject(error);
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
                        res.send( { message: 'Запись успешно добавлена!' });
                        console.log(result + " запись добавлена")

                        if(err){
                            return reject(error);
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
                                
            } catch(error){
                console.log(error)
            }
        }

        CarAdding();
    }
});

app.post("/addUser", (req, res) => {
    if (req.body.userName === '' || req.body.password === '' || req.body.role === '')
        res.send( { message: 'Не все поля заполнены!' });
    else {
        const userName = req.body.userName;
        const password = req.body.password;
        const role = req.body.role;
        
        let warning = false;

        console.log("\n");

        let CheckUser = () => {
            return new Promise((resolve, reject) => {
                db.query(
                    "SELECT id_user FROM user WHERE user_name=?",
                    [userName], (err, result) => {
                        if (result.length === 0) {
                            console.log(result.length + " такого пользователя нет")
                        }
                        else  {
                            console.log(result.length + " такой пользователь есть");
                            res.send( { message: 'Введенное имя пользователя недоступно!' }); 
                            warning = true;
                        }
                        
                        if(err) {
                            return reject(error);
                        }
                        return resolve(result);                                           
                });
            });
        }

        let AddUser = () => {
            return new Promise((resolve, reject) => {
                
                console.log("AddUser");
                db.query(
                    "INSERT INTO user (user_name, password, role) VALUES (?, ?, ?)",
                    [userName, password, role], (err, result) => {
                        res.send( { message: 'Пользователь успешно добавлен!' });
                        console.log(result + " пользователь добавлен")

                        if(err){
                            return reject(error);
                        }
                        return resolve(result);
                });
            });
        }

        async function UserAdding() {
 
            try {
                await CheckUser();
                if (!warning)
                    await AddUser();
                                
            } catch(error){
                console.log(error)
            }
        }

        UserAdding();
    }
});

app.post('/inOutCar', (req, res) => {
    const direction = req.body.direction;



    let log = [];
    let plate = fs.readFileSync("car.txt", "utf8").toString().split("\n").toString();


    if (req.session.log)
        log = req.session.log;

    if (plate.length < 6) {
        log.push('Номер автомобиля не распознан');
        req.session.log = log;
        res.send({ log: log, message: 'Номер машины не распознан!' });
    }
    else {
        let warning = false;
        let idCar, idDay;
        let idGates = '1';
        
        plate = translitRuEn(plate.trim());

        let CheckCarInOut = () => {
            return new Promise((resolve, reject) => {

                db.query(
                    "SELECT id_car FROM car WHERE license_plate=?",
                    [plate], (err, result) => {
                        if (result.length === 0) {
                            log.push(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'}) + ' Автомобиль с номером ' + plate + ' отсутствует в базе данных');
                            req.session.log = log;
                            res.send({ log: log, message: 'Машины с данным номером нет в базе данных!' }); 
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

        let CheckRightGates = () => {
            return new Promise((resolve, reject) => {

                db.query(
                    "SELECT * FROM gates_allowed WHERE id_car=? AND id_gates=?",
                    [idCar, idGates], (err, result) => {
                        if (result.length === 0) {
                            log.push(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'}) + ' Автомобиль с номером ' + plate + ' не имеет доступа к данной проходной');
                            req.session.log = log;
                            res.send({ log: log, message: 'У машины с данным номером нет доступа к этой проходной!' }); 
                            warning = true;
                        }

                        if(err){
                            return reject(error);
                        }
                        return resolve(result);
                });
            });
        }

        let AddDate = () => {
            return new Promise((resolve, reject) => {

                db.query(
                    "SELECT id_date FROM date WHERE date=CURDATE()",
                    (err, result) => {

                        if (result.length === 0){
                            db.query(
                                "INSERT INTO date (date) VALUES (CURDATE())",
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

        let CheckAddArrDate = () => {
            return new Promise((resolve, reject) => {

                db.query(
                    "SELECT * FROM arriving_date WHERE id_date=? AND id_car=?",
                    [idDay, idCar], (err, result) => {

                        if (result.length === 0) {
                            db.query(
                                "INSERT INTO arriving_date (id_date, id_car) VALUES (?, ?)",
                                [idDay, idCar]);
                        }

                        if(err){
                            return reject(error);
                        }
                        return resolve(result);
                });
            });
        }

        let AddCarInOut = () => {
            return new Promise((resolve, reject) => {

                if (direction === 'in') {                    
                    db.query(
                        "UPDATE arriving_date SET arrival_time=CURTIME() WHERE id_date=? AND id_car=?",
                        [idDay, idCar], (err, result) => {

                            if(err){
                                return reject(error);
                            }
                            return resolve(result);
                    });
                    log.push(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'}) + 'Автомобиль c номером ' + plate + ' въехал');
                    req.session.log = log;         
                    res.send({ log: log, message: 'Машина может быть пропущена!' });   
                }
                else {
                    db.query(
                        "UPDATE arriving_date SET departure_time=CURTIME() WHERE id_date=? AND id_car=?",
                        [idDay, idCar], (err, result) => {

                            if(err){
                                return reject(error);
                            }
                            return resolve(result);
                    })
                    log.push(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'}) + 'Автомобиль c номером ' + plate + ' выехал');
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
            } catch(error){
                console.log(error)
            }
        }

        CarInOut();
    }
});

app.get('/InOutLog', (req, res) => {
    if (req.session.log)
        res.send({ log: req.session.log });
});

app.post('/dateTable', (req, res) => {
    const date = req.body.date;
    console.log(date)

    db.query(
        "SELECT * FROM arriving_date INNER JOIN date ON date.id_date INNER JOIN car ON car.id_car WHERE arriving_date.id_date=date.id_date AND arriving_date.id_car=car.id_car AND date.date=?",
        [date],
        (err, result) => {
            console.log(result)
            if (err)
                res.send({ err: err });
            res.send({ result });
        }
    );
});

app.get('/carTable', (req, res) => {
    db.query("SELECT * FROM car INNER JOIN person ON person.id_person WHERE person.id_person=car.id_person", (err, result) => {
        // result.forEach(element => {
        //     console.log(element.start_date)
        // });
        res.send({ result });
        // console.log(err)
    });
});

app.listen(3001, () => {
    console.log("SERVER RUNNING ON PORT 3001");
});


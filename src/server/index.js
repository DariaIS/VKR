const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');


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
        saveUnitialized: false,
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

app.post("/add", (req, res) => {
    // console.log(req.body.plate);
    // console.log(req.body.brand);
    // console.log(req.body.name);
    // console.log(req.body.chair);
    // console.log(req.body.space);


    if (req.body.plate === '' || req.body.brand === '' || req.body.name === '' || req.body.chair === '' || req.body.gates === '' || req.body.space === '')
        res.send( { message: 'Не все поля заполнены!' });
    else {
        const plate = req.body.plate;
        const brand = req.body.brand;
        const name = req.body.name;
        const chair = req.body.chair;
        const gates = req.body.gates;
        const space = req.body.space;
        
        let idPerson, idParkingSpace, idCar, idGates, currentParkingSpace;
        let warning = false;

        let ifGates = () => {
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

        let ifCar = () => {
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

        let ifParkingSpace = () => {
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

        let resParkingSpace = () => {
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
        
        let resPerson = () => {
            return new Promise((resolve, reject) => {
                db.query(
                    "SELECT id_person FROM person WHERE full_name=? AND chair=?",
                    [name, chair], (err, result) => {
                    console.log(result);

                        if (result.length === 0){
                            db.query(
                                "INSERT INTO person (full_name, chair) VALUES (?, ?)",
                                [name, chair], (err, result) => {
                                    idPerson = result.insertId;
                            });
                        }
                        else idPerson = result[0].id_person;

                        if(err){
                            return reject(error);
                        }
                        return resolve(result);
                    }
                );
            });
        }

        let resCar = () => {
            return new Promise((resolve, reject) => {

                db.query(
                    "INSERT INTO car (id_person, id_parking_space, car_brand, license_plate, start_date, expiration_date) VALUES (?, ?, ?, ?, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 YEAR))",
                    [idPerson, idParkingSpace, brand, plate], (err, result) => {
                        idCar = result.insertId;

                        if(err){
                            return reject(error);
                        }
                        return resolve(result);
                });
            });
        }

        let resGates = () => {
            return new Promise((resolve, reject) => {

                db.query(
                    "INSERT INTO gates_allowed (id_car, id_gates) VALUES (?, ?)",
                    [idCar, idGates], (err, result) => {
                        res.send( { message: 'Запись успешна добавлена!' });

                        if(err){
                            return reject(error);
                        }
                        return resolve(result);
                });
            });
        }

        async function sequentialQueries() {
 
            try {
                await ifGates();
                if (!warning)
                    await ifCar();
                if (!warning)
                    await ifParkingSpace();
                if (!warning)
                    await resParkingSpace();
                if (!warning)
                    await resPerson();
                if (!warning)
                    await resCar();
                if (!warning)
                    await resGates();
                                
            } catch(error){
                console.log(error)
            }
        }

        sequentialQueries();

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

app.post('/logout', (req, res) => {
    req.session.loggedIn = false;
    delete req.session.user;
    res.send({ loggedIn: false, user: req.session.user });
});

app.listen(3001, () => {
    console.log("SERVER RUNNING ON PORT 3001");
});


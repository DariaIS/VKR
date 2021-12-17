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


    if (req.body.plate === '' && req.body.brand === '' && req.body.name === '' && req.body.chair === '' && req.body.space === '')
        res.send( { message: 'Не все поля заполнены!' });
    else {
        const plate = req.body.plate;
        const brand = req.body.brand;
        const name = req.body.name;
        const chair = req.body.chair;
        const gates = req.body.gates;
        const space = req.body.space;
        
        let idPerson, idParkingSpace, idCar;

            resParkingSpace = () => {
                return new Promise((resolve, reject) => {
                    db.query(
                        "SELECT id_parking_space FROM parking_space WHERE parking_space_number=?",
                        [space], (err, result) => {

                            if (result.length === 0){
                                db.query(
                                    "INSERT INTO parking_space (parking_space_number, is_free) VALUES (?, true)",
                                    [space], (err, result) => {
                                        idParkingSpace = result.insertId;
                                });
                            } else res.send( { message: 'Данное парковочное место занято!' });

                            if(err){
                                return reject(error);
                            }
                            return resolve(result);
                        }
                    );
                });
            }
        
            resPerson = () => {
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
                        "SELECT * FROM car WHERE license_plate=?",
                        [plate], (err, result) => {
                            console.log(idPerson);
                            console.log(idParkingSpace);
                            if (idParkingSpace != undefined)
                                if  (result.length === 0){
                                    // console.log(idParkingSpace);
                                    // console.log(idPerson);
                                    db.query(
                                        "INSERT INTO car (id_person, id_parking_space, car_brand, license_plate) VALUES (?, ?, ?, ?)",
                                        [idPerson, idParkingSpace, brand, name], (err, result) => {
                                            console.log(err);
                                            console.log(result);
                                            // idCar = result.insertId;
                                    });
                                } else res.send( { message: 'Машина с веденным номером уже есть в базе данных!' });
                            
                            if(err){
                                return reject(error);
                            }
                            return resolve(result);
                        }
                    );
                });
            }

        async function sequentialQueries() {
 
            try {
                await resParkingSpace();
                await resPerson();
                await resCar();
                
                // here you can do something with the three results
                
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


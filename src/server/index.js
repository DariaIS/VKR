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
        console.log("CONNECTED TO mySQL SERVER SUCCESSFULLY");
    }
});

app.post("/add", (req, res) => {
    const plate = req.body.plate;
    const brand = req.body.brand;
    const name = req.body.name;
    const chair = req.body.chair;
    const gates = req.body.gates;
    const space = req.body.space;
    
    let id_person;

    function setValue(someVar, value) {
        someVar = value;
    }


    db.query(
        "SELECT id_person FROM person WHERE full_name=? AND chair=?",
        [name, chair], (err, result) => {
            if (result.length === 0){
                db.query(
                    "INSERT INTO person (full_name, chair) VALUES (?, ?)",
                    [name, chair], (err, result) => {
                        id_person = result.insertId;
                });
            }
            else id_person = result[0].id_person;
        }
    );
    
    db.query(
        "SELECT id_parking_space FROM parking_space WHERE parking_space_number=?",
        [space], (err, result) => {
            console.log(id_person);

            if  (result.length === 0){
                db.query(
                    "INSERT INTO parking_space (parking_space_number, is_free) VALUES (?, true)",
                    [space], (err, result) => {
                        console.log(id_person);
                });
            }
        }
    );

    // db.query(
    //     "SELECT id_car FROM car WHERE license_plate=?",
    //     [plate], (err, result) => {
    //         console.log(result);
    //         if  (result.length === 0){
    //             db.query(
    //                 "INSERT INTO car (id_car, id_person, id_parking_space, car_brand) VALUES (?, ?, ?, ?)",
    //                 [name, chair], (err, result) => {
    //                     console.log(err);
    //             });
    //         }
    //     }
    // );



    // db.query(
    //     "INSERT INTO car (id_person, car_brand, license_plate) VALUES (?, ?, ?)",
    //     [name, chair], (err, result) => {
    //         console.log(err);
    // });
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


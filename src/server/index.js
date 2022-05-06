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
        key: 'user',
        secret: 'userData',
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 1000 * 60 * 24, // 60 * 1000 - минута
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

app.listen(3001, () => {
    console.log("SERVER RUNNING ON PORT 3001");
});

require('./routes')(app, db);
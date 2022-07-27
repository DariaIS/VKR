const bcrypt = require('bcrypt');

module.exports = function (app, db) {

    // запрос для проверки того, вошел ли пользователь в систему
    app.get('/login', (req, res) => {
        // если в cookies содержится информация об учетной записи,
        // то посылаются значение true и данные учетной записи
        if (req.session.user) {
            res.send({ loggedIn: true, user: req.session.user });
        } else
            res.send({ loggedIn: false });
    });

    // запрос для входа в учетную запись 
    app.post('/login', (req, res) => {
        // получение введенных имени пользователя и пароля из тела запроса
        const username = req.body.username;
        const password = req.body.password;

        // SQL запрос для поиска пользователя с введенным именем
        db.query(
            "SELECT * FROM user WHERE user_name = ?",
            [username],
            async (err, result) => {
                if (err)
                    res.send({ err: 'Произошла ошибка. Пожалуйста, попробуйте снова позже!' });

                if (result.length > 0 && username === result[0].user_name) {
                    // если пользователь найден, то сравниваются пароли
                    const comparison = await bcrypt.compare(password, result[0].password);
                    if (comparison) {
                        // если пароли совпадают, то данные о пользователе записываются в cookies
                        req.session.user = { userName: result[0].user_name, role: result[0].role };
                        req.session.loggedIn = true;
                        res.send(result);
                    } else res.send({ err: 'Неверный логин или пароль!' });
                } else res.send({ err: 'Неверный логин или пароль!' });
            }
        );
    });
}
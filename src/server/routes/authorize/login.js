const bcrypt = require('bcrypt');

module.exports = function (app, db) {

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
            "SELECT * FROM user WHERE user_name = ?",
            [username],
            async (err, result) => {
                if (err)
                    res.send({ err: 'Произошла ошибка. Пожалуйста, попробуйте снова позже!' });

                if (result.length > 0) {
                    const comparison = await bcrypt.compare(password, result[0].password);
                    if (comparison) {
                        req.session.user = {userName: result[0].user_name, role: result[0].role};
                        req.session.loggedIn = true;
                        res.send(result);
                    } else res.send({ err: 'Неверное имя пользователя или пароль!' });
                } else res.send({ err: 'Неверное имя пользователя или пароль!' });
            }
        );
    });
}
const bcrypt = require('bcrypt');

module.exports = function (app, db) {

    app.post("/deleteUser", async (req, res) => {

        const userName = req.body.userName;
        const password = req.body.password;

        let warning = false;

        const checkUserSame = () => {
            return new Promise((resolve, reject) => {
                console.log(req.session.user.userName.toUpperCase());
                console.log(req.session.user.userName === userName);
                if (req.session.user.userName.toUpperCase() === userName.toUpperCase()) {
                    res.send({ err: 'Вы не можете удалить свою учетную запись!' });
                    return reject('err');
                }
                resolve(userName);
            })
        }

        const checkUserExist = () => {
            return new Promise((resolve, reject) => {
                db.query(
                    "SELECT password FROM user WHERE user_name=?",
                    [userName], async (err, result) => {
                        if (err) {
                            res.send({ err: 'Произошла ошибка. Пожалуйста, попробуйте снова позже!' });
                            return reject(err);
                        }

                        if (result.length !== 0) {
                            const comparison = await bcrypt.compare(password, result[0].password);
                            if (!comparison) {
                                res.send({ err: 'Неверное имя пользователя или пароль!' });
                                // warning = true;
                                return reject(err);
                            }

                        } else {
                            // warning = true;
                            res.send({ err: 'Неверное имя пользователя или пароль!' });
                            return reject(err);
                        }
                        return resolve(result);
                    }
                );
            });
        }

        const deleteUser = () => {
            return new Promise((resolve, reject) => {
                console.log('deleteUser');
                db.query(
                    "DELETE FROM user WHERE user_name = ?",
                    [userName], (err, result) => {
                        if (err) {
                            res.send({ err: 'Произошла ошибка. Пожалуйста, попробуйте снова позже!' });
                            return reject(err);
                        }

                        res.send({ message: 'Пользователь успешно удален!' });
                        return resolve(result);
                    }
                );
            });
        }

        async function userDeleting() {
            try {
                await checkUserSame()
                await checkUserExist();
                await deleteUser();
            } catch (error) {
                console.log(error)
            }
        }

        userDeleting();
    });
}
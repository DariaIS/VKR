module.exports = function (app) {

    app.get('/inOutLog', (req, res) => {
        if (req.session.log)
            res.send({ log: req.session.log });
        else
            res.send({ log: '' });
    });
}
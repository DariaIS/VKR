module.exports = function (app, db) {

    app.get('/allChairs', (req, res) => {
        db.query(
            "SELECT * FROM chair",
            (err, result) => {
                if (err)
                    res.send({ err: 'Произошла ошибка. Пожалуйста, попробуйте снова позже!' });
                else {
                    result.forEach(elem => {
                        elem.name = 'idChair';
                        elem.label = elem.chair;
                        elem.value = elem.id_chair;
                        delete elem.chair;
                        delete elem.id_chair;
                    });
                    res.send({ result });
                }
            }
        );
    });
}
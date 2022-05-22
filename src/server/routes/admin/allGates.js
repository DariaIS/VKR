module.exports = function (app, db) {

    app.get('/allGates', (req, res) => {
        db.query(
            "SELECT id_gates, gates_name FROM gates",
            (err, result) => {
                if (err)
                    res.send({ err: err });
                else {
                    result.forEach(elem => {
                        elem.label = elem.gates_name;
                        elem.value = elem.id_gates;
                        delete elem.gates_name;
                        delete elem.id_gates;
                    });
                    res.send({ result });
                }
            }
        );
    });
}
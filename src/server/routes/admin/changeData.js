module.exports = function (app, db) {

    app.get('/changeData', (req, res) => {

        let plate = req.query.plate.split(',');
        console.log(plate);
    });
}
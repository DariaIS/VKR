const loginRoutes = require('./authorize/login');
const logoutRoutes = require('./authorize/logout');

const addCarRoutes = require('./admin/addCar');
const addUserRoutes = require('./admin/addUser');
const changeDataRoutes = require('./admin/changeData');
const expiredCarsRoutes = require('./admin/expiredCars');

const inOutCarRoutes = require('./security/inOutCar');
const inOutLogRoutes = require('./security/inOutLog');
const carsPlatesRoutes = require('./security/carsPlates');

const dateTableRoutes = require('./analyst/dateTable');
const carTableRoutes = require('./analyst/carTable');

module.exports = function(app, db) {
    loginRoutes(app, db);
    logoutRoutes(app);

    addCarRoutes(app, db);
    addUserRoutes(app, db);
    changeDataRoutes(app, db);
    expiredCarsRoutes(app, db);

    inOutCarRoutes(app, db);
    inOutLogRoutes(app);
    carsPlatesRoutes(app, db);

    dateTableRoutes(app, db);
    carTableRoutes(app, db);
}
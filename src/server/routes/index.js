const loginRoutes = require('./authorize/login');
const logoutRoutes = require('./authorize/logout');

const addCarRoutes = require('./admin/addCar');
const addUserRoutes = require('./admin/addUser');

const inOutCarRoutes = require('./security/inOutCar');
const inOutLogRoutes = require('./security/inOutLog');

const dateTableRoutes = require('./analyst/dateTable');
const carTableRoutes = require('./analyst/carTable');

module.exports = function(app, db) {
    loginRoutes(app, db);
    logoutRoutes(app);

    addCarRoutes(app, db);
    addUserRoutes(app, db);

    inOutCarRoutes(app, db);
    inOutLogRoutes(app);

    dateTableRoutes(app, db);
    carTableRoutes(app, db);
}
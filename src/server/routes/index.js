const fileManagerRoutes = require('./fileManager');

module.exports = function(app) {
    fileManagerRoutes(app);
}
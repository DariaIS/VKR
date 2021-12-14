const Router = require('express');
const router = new Router();

router.post('/login', controller.login);
router.post('/users', controller.getUsers);

module.exports = router;
const express = require('express');

const router = express.Router();
const loginController = require('../controller/loginController.js');

router.put('/login', loginController.login);
//router.put('/passwordRecovery', loginController.passwordRecovery);


module.exports = router;

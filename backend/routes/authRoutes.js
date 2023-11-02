const express = require('express');

//router object
const router = express.Router();

//routes
router.post('/register', registerController);

module.exports = router;
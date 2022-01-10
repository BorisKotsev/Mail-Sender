const express = require('express');
const router = express.Router();

const emailRoute = require('./email.route');

router.use('/email', emailRoute);

module.exports = router;
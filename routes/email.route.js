const express = require('express');
const router = express.Router();

const { sendEmailValidation } = require("../validation/validation");
const ResponseError = require("../errors/responseError");
const { HTTP_STATUS_CODES } = require('../global');
const EmailService = require('../services/email.service');

router.post("/", async function (req, res, next) {
    const { error } = sendEmailValidation(req.body);
    if (error) return next(new ResponseError(error.details[0].message, HTTP_STATUS_CODES.BAD_REQUEST));

    try {
        await EmailService.send(req.body.receiverEmail, req.body.subject, req.body.message);

        res.sendStatus(HTTP_STATUS_CODES.OK);
    } catch (err) {
        return next(new ResponseError(err.message || "Internal server error", err.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR));
    }
});

module.exports = router;
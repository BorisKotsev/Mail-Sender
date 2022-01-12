const express = require('express');
const fs = require('fs');
const router = express.Router();

const { sendEmailValidation } = require("../validation/validation");
const ResponseError = require("../errors/responseError");
const { HTTP_STATUS_CODES } = require('../global');
const EmailService = require('../services/email.service');

router.post("/", async function (req, res, next) 
{
    const { error } = sendEmailValidation(req.body);

    if (error) 
        return next(new ResponseError(error.details[0].message, HTTP_STATUS_CODES.BAD_REQUEST));

    try 
    {
        fs.readFile(__dirname + `/../mailTemplates/default/bg.html`, async function (error, html) 
        {
            if (error) 
                throw error; 

            html = html.toString().replace("{var}", req.body.receiverEmail);
            await EmailService.sendHtml(req.body.receiverEmail, req.body.subject, html);
        });

        res.sendStatus(HTTP_STATUS_CODES.OK);
    } 
    catch (err) 
    {
        return next(new ResponseError(err.message || "Internal server error", err.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR));
    }
});

module.exports = router;
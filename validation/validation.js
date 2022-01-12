const Joi = require('@hapi/joi');

const sendEmailValidation = data => 
{
    const schema = Joi.object({
        receiverEmail: Joi.string().min(3).max(320).required().email(),
        subject: Joi.string().min(1).max(1000).required(),
        message: Joi.string().min(1).max(1000).required(),
    })

    return schema.validate(data);
}

module.exports = 
{
    sendEmailValidation
}
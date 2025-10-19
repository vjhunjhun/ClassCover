const Joi = require("joi");
module.exports.classSchema= Joi.object({
    c : Joi.object({
        subject:Joi.string().required(),
        originalTeacher:Joi.string().required(),
        time:Joi.string().required(),
        room:Joi.string().required(),
        status:Joi.string().required().allow("",null),
        claimedBy:Joi.string().allow("",null),
    }).required()
});

module.exports.chatSchema = Joi.object({
    chat:Joi.object({
        msg:Joi.string().required(),
    }).required(),
});
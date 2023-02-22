const Joi = require('joi');

const name = Joi.string().max(30);
const lastName = Joi.string().max(30);
const email = Joi.string().email({ tlds: { allow: false } });
const jobArea = Joi.string();
const avatar = Joi.string();
const user_schema = Joi.object({
    name: name.required(),
    lastName: lastName.required()
})

const update_user_schema = Joi.object({
    name: name,
    lastName: lastName,
    email: email,
    jobArea: jobArea,
    avatar: avatar,
});

// SIRVE PARA UPDATE TAMBIEN
const get_user_schema = Joi.object({
    id: Joi.string().uuid(),
})
module.exports = {
    user_schema,
    update_user_schema,
    get_user_schema
}
const Joi = require('joi');
const categorie_schema = Joi.object({
    name: ''
});
const update_categorie_schema = Joi.object({
    name: '',
});

const get_categorie_schema = Joi.object({
    id: Joi.string().uuid(),
});

module.exports = {
    categorie_schema,
    update_categorie_schema,
    get_categorie_schema
}
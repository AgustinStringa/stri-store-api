const Joi = require('joi');

const name = Joi.string().min(6).max(30);
const price = Joi.number().greater(0);
const image = Joi.string();
const imageUri = Joi.string().uri();
const product_schema = Joi.object({
    name: name.required(),
    price: price.required(),
    image: image,
})

const update_product_schema = Joi.object({
    name: name,
    price: price,
    image: image,
});

// SIRVE PARA UPDATE TAMBIEN
const get_product_schema = Joi.object({
    id: Joi.string().uuid(),
})
module.exports = { product_schema, update_product_schema, get_product_schema }
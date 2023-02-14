const express = require('express');
const faker = require('faker');
const products_router = express.Router()
products_router.get('/', function (req, res) {
    const limit = req.query.limit || 10;
    const products = [];
    for (let index = 1; index <= limit; index++) {
        products.push({
            name: faker.commerce.product(),
            price: parseFloat(faker.commerce.price()),
            image: faker.image.imageUrl(),
        })

    }
    res.json(products);
});

products_router.post('/', function (req, res) {
    const { body } = req;
    res.json({ message: 'creando producto' }).status(201);
});
products_router.put('/', function (req, res) {
    const { id } = req.body; v
    res.json({ message: 'producto con id ' + id + ' modificado' });
});
products_router.delete('/', function (req, res) {
    const { id } = req.body;
    res.json({ message: 'Eliminando producto con id' + id });

});
module.exports = { route_name: 'products', router: products_router };
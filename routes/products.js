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

module.exports = { route_name: 'products', router: products_router };
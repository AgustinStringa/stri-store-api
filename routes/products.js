const express = require('express');
const { ProductService } = require('../services/products');
const products_router = express.Router()
const products_service = new ProductService();
products_router.get('/', async function (req, res, next) {
    try {
        const limit = req.query.limit || 100;
        const products = await products_service.getProducts(limit);
        res.status(200).json({ products, length: products.length });
    } catch (error) {
        // res.json({ error: "error capturado" })
        next(error);
    }
});
products_router.get('/:id', function (req, res) {
    const id = req.params.id || "49112a34-238d-4394-916d-0d5d107ad674";
    const product = products_service.getProductById(id);
    if (product.error_message) {
        res.status(404);
    } else {
        res.status(200);
    }
    res.json({ product: product });
});

products_router.post('/', function (req, res) {
    const { product } = req.body;
    const newProduct = products_service.createProduct(product);
    res.json(newProduct).status(201);
});
products_router.patch('/:id', function (req, res) {
    const { id } = req.params;
    const { product } = req.body;
    const newProduct = products_service.updateProduct(id, product)
    res.json({ product: newProduct });
});
products_router.delete('/:id', function (req, res) {
    const { id } = req.params;
    const product = products_service.deleteProduct(id);
    res.json({ product: product });
});
module.exports = { products_router };
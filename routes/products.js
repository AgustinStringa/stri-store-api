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
products_router.get('/:id', async function (req, res, next) {
    try {
        const id = req.params.id || "49112a34-238d-4394-916d-0d5d107ad674";
        const product = await products_service.getProductById(id);
        res.status(200).json({ product: product });
    } catch (error) {
        console.error(error);
        next(error);
    }
    // if (product.error_message) {
    //     res.status(404);
    // } else {
    //     res.status(200);
    // }
});

products_router.post('/', async function (req, res, next) {
    try {
        const newProduct = await products_service.createProduct(req.body);
        res.json(newProduct).status(201);
    } catch (error) {
        console.error(error);
        next(error);
    }

});
products_router.patch('/:id', async function (req, res, next) {
    try {
        const { id } = req.params;
        const newProduct = await products_service.updateProduct(id, req.body);
        res.json({ product: newProduct });
    } catch (error) {
        console.error(error);
        next(error);
    }
});
products_router.delete('/:id', async function (req, res, next) {
    try {
        const { id } = req.params;
        const product = await products_service.deleteProduct(id);
        res.json({ product: product });
    } catch (error) {
        console.error(error);
        next(error);
    }
});
module.exports = { products_router };
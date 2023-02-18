const { products_router } = require('./products');
const { users_router } = require('./users');
const { categories_router } = require('./categories');
const express = require('express');
function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    app.get('/', function (req, res) {
        res.send('hello world')
    })
    router.use('/products', products_router);
    router.use('/users', users_router);
    router.use('/categories', categories_router);
}
module.exports = routerApi;
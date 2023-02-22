require('module-alias/register')
const { products_router } = require('@routes/products');
const { users_router } = require('@routes/users');
const { categories_router } = require('@routes/categories');
const express = require('express');
function routerApi(app) {
    const router = express.Router();
    const routerv2 = express.Router();
    routerv2.get('/', (req, res) => {
        res.json({ message: "welcome to the v2" })
    })
    app.use('/api/v1', router);
    app.use('/api/v2', routerv2);
    app.get('/', function (req, res) {
        res.send('hello world')
    })
    router.use('/products', products_router);
    router.use('/users', users_router);
    router.use('/categories', categories_router);
}
module.exports = routerApi;
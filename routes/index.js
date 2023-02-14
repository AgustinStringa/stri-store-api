const products_router = require('./products');

function routerApi(app) {
    app.get('/', function (req, res) {
        res.send('hello world')
    })
    app.use("/products", products_router);
}
module.exports = routerApi;
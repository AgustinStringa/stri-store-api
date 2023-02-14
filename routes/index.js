const products_router = require('./products');
const users_router = require('./users');
function routerApi(app, prefix = "api") {
    const routers = [products_router, users_router];
    app.get('/', function (req, res) {
        res.send('hello world')
    })
    routers.forEach((element) => {
        app.use(`/${prefix}/${element.route_name}`, element.router)
    })
}
module.exports = routerApi;
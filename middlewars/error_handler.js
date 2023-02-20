//only log errors and next sending the error
//standar nexts do not has args, ==> next()
function logErrors(err, req, res, next) {
    console.error(err);
    next(err);
}
function errorHandler(err, req, res, next) {
    console.error(err);
    res.status(500).json({ error_message: err.message })
}

function boomErrorHanlder(err, req, res, next) {
    if (err.isBoom) {
        console.error(err);
        const { output } = err;
        const { payload: { statusCode, message, headers } } = output;
        res.status(statusCode).json({ message: message, statusCode });
    }
    next(err);
}

module.exports = { logErrors, errorHandler, boomErrorHanlder };
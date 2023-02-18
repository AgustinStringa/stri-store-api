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

module.exports = { logErrors, errorHandler };
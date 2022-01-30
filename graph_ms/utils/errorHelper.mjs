'use strict'

const errorCatcher = (f) => {
    const wrappedFunc = (req, res, next) => f(req, res).catch(next)
    return wrappedFunc
}

const errorHandler = (err, req, res, next) => {
    console.log(err.message)
    res.status(500).send(err.message)
}

export { errorCatcher, errorHandler }
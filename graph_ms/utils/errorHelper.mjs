'use strict'

const error_catcher = (f) => {
    const wrapped_func = (req, res, next) => f(req, res).catch(next)
    return wrapped_func
}

const error_handler = (err, req, res, next) => {
    console.log(err.message)
    res.status(500).send(err.message)
}

export { error_catcher, error_handler }
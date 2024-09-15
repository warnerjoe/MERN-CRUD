// Replace express middleware
const errorHandler = (err, req, res, next) => {
    // If there is no status code, return status code 500 (server issue)
    const statusCode = res.statusCode ? res.statusCode : 500;

    // Respond with the status code
    res.status(statusCode);

    // Composes body of response
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = {
    errorHandler,
}
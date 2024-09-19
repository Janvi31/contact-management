// middlewares/errorHandler.js
const ApiError = require('../utils/ApiError');

const errorHandler = (err, req, res, next) => {
    // If the error is an instance of ApiError, handle it accordingly
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            status: err.statusCode,
            message: err.message,
        });
    }

    // For any other unhandled errors, return a 500 (Internal Server Error)
    res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
        // Include stack trace in development mode only
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });

    // Optionally log errors to the console for 500+ status codes
    if (res.statusCode >= 500) {
        console.error(err.stack);
    }
};

module.exports = errorHandler;

const ApiError = require("../utils/ApiError");

const errorHandler = (err, req, res, next) => {
const statusCode = err instanceof ApiError ? err.statusCode : 500;

console.error(`Error: ${err}`);

const response = {
    success: false,
    message : err.message || "Internal Server Error"
}

if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
}

res.status(statusCode).json(response);
};

module.exports = errorHandler;
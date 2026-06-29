const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');

const protect = (req, res, next) => {
    try {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new ApiError(401, "Access denied. No token provided");
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: decoded.id};
    next();
} catch (error) {
    if (error instanceof ApiError) {
        next(error);
    } else {
        next(new ApiError(401, "Invalid token"));
    }
}
};

module.exports = protect;
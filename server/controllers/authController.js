const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ApiError = require('../utils/ApiError');

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
};

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            throw new ApiError(400, "Please provide name, email and password");
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new ApiError(400, "User already exists");
        }

        const user = await User.create({ name, email, password });

        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            data: 
            {token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
        }
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new ApiError(400, "Please provide email and password");
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            throw new ApiError(400, "Invalid email or password");
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new ApiError(400, "Invalid email or password");
        }

        const token = generateToken(user._id);
        console.log(token, "token");
        console.log(user, "user")
        res.status(200).json({
            success: true,
            data: 
            {
                token,
                user: {
                id: user._id,
                name: user.name,
                email: user.email
                },
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login
};
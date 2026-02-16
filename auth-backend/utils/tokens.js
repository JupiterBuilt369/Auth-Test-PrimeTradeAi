// utils/tokens.js
const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, name: user.name }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15m' // Short life: 15 minutes
    });
};

const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id, name: user.name }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d' // Long life: 7 days
    });
};

module.exports = { generateAccessToken, generateRefreshToken };
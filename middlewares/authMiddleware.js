const {jwtUtil} = require('../utils/jwtUtil');
const asyncHandler = require('express-async-handler');

const authenticateToken = asyncHandler(async (req, res, next) => {
    let token;
    const authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];
        const userData = await jwtUtil.verify(token);
        // console.log(userData);
        req.user = userData;
        next();
    }

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    
});

module.exports = {authenticateToken};
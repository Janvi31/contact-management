const jwt = require('jsonwebtoken');

const jwtUtil = {
    sign: (payload) => {
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    },

    verify: (token) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) return reject(err);
                resolve(decoded);
            });
        });
    }
};

module.exports = {jwtUtil};
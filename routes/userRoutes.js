const express = require('express');
const { registerUser, loginUser, currentUser } = require('../controllers/userController');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/current', authenticateToken , currentUser);

module.exports = router;
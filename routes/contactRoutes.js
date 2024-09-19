const express = require('express');
const { getContacts, createContact, getContact, updateContact, deleteContact } = require('../controllers/contactController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.use(authenticateToken);
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);


// Can also do like this:
// router.get("/",getContacts);

module.exports = router;
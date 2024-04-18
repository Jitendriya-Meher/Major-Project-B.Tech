const express = require('express');
const { contactUs, getAllContacts, deleteUserContact, getUserContact } = require('../controller/contact-controllers');
const { authMiddleware } = require('../middlewares/auth-middleware');
const { generateEmailContact } = require('../controller/otp-controllers');
const router = express.Router();

router.route("/").post(contactUs);
router.route("/all").get(authMiddleware,getAllContacts);
router.route("/:id").delete(authMiddleware,deleteUserContact);
router.route("/:id").get(authMiddleware,getUserContact);
router.route("/reply").post(generateEmailContact);

module.exports = router;
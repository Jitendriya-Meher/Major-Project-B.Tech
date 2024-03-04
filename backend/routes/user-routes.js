const express = require('express');
const { authMiddleware } = require('../middlewares/auth-middleware');
const { editUser, editPassword, deleteUser } = require('../controller/user-controllers');
const userRoutes = express.Router();

userRoutes.route("/edit").patch( authMiddleware, editUser);
userRoutes.route("/edit/password").patch( authMiddleware, editPassword);
userRoutes.route("/delete").post( authMiddleware, deleteUser);

module.exports = userRoutes;
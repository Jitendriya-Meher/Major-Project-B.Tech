const express = require('express');
const { authMiddleware } = require('../middlewares/auth-middleware');
const { editUser, editPassword, deleteUser, logOutUser } = require('../controller/user-controllers');
const userRoutes = express.Router();

userRoutes.route("/edit").patch( authMiddleware, editUser);
userRoutes.route("/edit/password").patch( authMiddleware, editPassword);
userRoutes.route("/delete").post( authMiddleware, deleteUser);
userRoutes.route("/logout").post( authMiddleware, logOutUser);

module.exports = userRoutes;
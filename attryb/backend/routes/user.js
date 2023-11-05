const express = require('express');
const { registerUser, login, logout, myProfile } = require('../controller/user');
const { isAuthenticated } = require('../utils/auth');

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(login);
router.route("/logout").get(logout)
router.route("/me").get(isAuthenticated,myProfile)

module.exports = router;
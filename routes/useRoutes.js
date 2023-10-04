const express = require("express");
const { signUp, login } = require("../controllers/userController");
const { isLoggedIn } = require("../middleware/authUser");
const router = express.Router();

router.route("/").post(signUp);
router.route("/login/:userid").post(isLoggedIn,login);

module.exports = router
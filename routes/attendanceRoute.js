const express = require("express");
const { markAttendance, fetchAttendance } = require("../controllers/attendanceController");
const { isLoggedIn } = require("../middleware/authUser");
const router = express.Router();

router.route("/mark/:userid").post(isLoggedIn,markAttendance)
router.route("/get/:userid").get(isLoggedIn,fetchAttendance)

module.exports = router;
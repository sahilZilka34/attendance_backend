// controllers/attendanceController.js
const { generateRandom } = require('../config/generateToken');
const Attendance = require('../models/attendance');
const {isSameDay} = require("date-fns")

const markAttendance = async (req, res) => {
 try {
    const { date, status } = req.body;
    const userID = req.user.userID;
    const id = generateRandom();

    // Check if the user has already marked attendance for the selected date
    let existingAttendance = await Attendance.findOne({
      where: {
        date,
        userID,
      },
    });

    if (existingAttendance) {
      // If attendance for the selected date exists, update the status
      existingAttendance.status = status;
      await existingAttendance.save();
      return res.status(200).json({ message: 'Attendance updated successfully' });
    } else {
      // If attendance for the selected date does not exist, create a new entry
      const newAttendance = await Attendance.create({
        id,
        date,
        status,
        userID,
      });
      return res.status(201).json({ message: 'Attendance marked successfully' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};




// Fetch attendance records for a user
const fetchAttendance = async (req, res) => {
  try {
    const userID = req.params.userid; // Assuming the user ID is provided in the request parameters

    // Fetch all attendance records for the user
    const attendanceRecords = await Attendance.findAll({ where: { userID } });

    res.status(200).json(attendanceRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch attendance records' });
  }
};


module.exports = {
  markAttendance,
  fetchAttendance,
};

const express = require('express');
const attendanceController = require('../controllers/attendance.controller');
const { verifyToken } = require('../middlewares/verifyToken');

const router = express.Router();

// Define routes for attendance operations
router.get('/', verifyToken, attendanceController.getAttendance);
router.get('/:id', verifyToken, attendanceController.getAttendanceById);
router.post('/', verifyToken, attendanceController.createAttendance);
// router.put('/attendance/:id',verifyToken, attendanceController.updateAttendance);
// router.delete('/attendance/:id',verifyToken, attendanceController.deleteAttendance);

// Add the route for getting attendance by date
router.get(
	'/date/:date',
	verifyToken,
	attendanceController.getAttendanceByDate
);

module.exports = router;

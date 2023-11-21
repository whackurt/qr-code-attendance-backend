const Attendance = require('../models/attendance.model');
const Personnel = require('../models/personnel.model');

// Create a new attendance record
exports.createAttendance = async (req, res) => {
	try {
		const { qr_code, remarks } = req.body;

		const personnel = await Personnel.findOne({ qr_code });

		if (!personnel) {
			return res
				.status(404)
				.json({ message: 'Personnel with code ' + qr_code + ' not found.' });
		}

		const currentDate = new Date();

		const date =
			currentDate.getFullYear() +
			'-' +
			(currentDate.getMonth() + 1) +
			'-' +
			currentDate.getDate();

		const time =
			currentDate.getHours() +
			':' +
			currentDate.getMinutes() +
			':' +
			currentDate.getSeconds();

		const attendance = await Attendance.create({
			qr_code,
			personnel: personnel._id,
			date,
			time,
			remarks,
		});

		return res.status(201).json(attendance);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Get all attendance records
exports.getAttendance = async (req, res) => {
	try {
		const attendance = await Attendance.find().populate('personnel');

		res.status(200).json(attendance);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Get a specific attendance record by ID
exports.getAttendanceById = async (req, res) => {
	try {
		const attendance = await Attendance.findById(req.params.id).populate(
			'personnel'
		);

		if (!attendance) {
			return res.status(404).json({ message: 'Attendance record not found.' });
		}

		res.status(200).json(attendance);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Get attendance records by date
exports.getAttendanceByDate = async (req, res) => {
	try {
		const date = req.params.date; // Get the date from the route parameter

		const attendance = await Attendance.find({
			date: date + 'T00:00:00.000Z',
		}).populate('personnel');

		if (!attendance || attendance.length === 0) {
			return res.status(404).json({
				message: 'No attendance records found for the specified date.',
			});
		}

		res.status(200).json(attendance);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

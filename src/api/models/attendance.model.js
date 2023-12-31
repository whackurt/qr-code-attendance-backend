const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
	personnel: {
		type: mongoose.Schema.ObjectId,
		ref: 'Personnel',
		required: true,
	},
	qr_code: {
		type: String,
		required: true,
	},
	dateTime: {
		type: Date,
		required: true,
	},
	remarks: {
		type: String,
	},
});

module.exports = mongoose.model('Attendance', attendanceSchema);

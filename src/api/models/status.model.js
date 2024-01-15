const mongoose = require('mongoose');

const personnelStatusSchema = new mongoose.Schema({
	status: {
		type: String,
		required: true,
	},
	// Add other fields as needed
});

module.exports = mongoose.model('PersonnelStatus', personnelStatusSchema);

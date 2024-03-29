const mongoose = require('mongoose');

const personnelSchema = new mongoose.Schema({
	qr_code: {
		type: String,
		required: true,
		unique: true,
	},

	first_name: {
		type: String,
		required: true,
	},

	last_name: {
		type: String,
		required: true,
	},

	position: {
		type: String,
		required: true,
	},

	personnelStatus: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'PersonnelStatus',
	},
});

module.exports = mongoose.model('Personnel', personnelSchema);

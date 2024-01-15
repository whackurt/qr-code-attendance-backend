const Personnel = require('../models/personnel.model');

exports.createPersonnel = async (req, res) => {
	const qr_code =
		'PQCA' + (await Math.random().toString(36).substring(2, 8)).toUpperCase();
	const { first_name, last_name, position, personnelStatus } = req.body;
	try {
		const personnel = await Personnel.create({
			first_name: first_name,
			last_name: last_name,
			position: position,
			qr_code: qr_code,
			personnelStatus: personnelStatus,
		});

		res.status(201).json(personnel);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.getPersonnel = async (req, res) => {
	try {
		const personnel = await Personnel.find().populate('personnelStatus');

		res.status(200).json(personnel);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Get personnel by ID
exports.getPersonnelById = async (req, res) => {
	try {
		const personnelId = req.params.id; // Get the ID from the route parameter

		// Use the "personnelId" value to find the personnel by their ID
		const personnel = await Personnel.findById(personnelId);

		if (!personnel) {
			return res.status(404).json({ message: 'Personnel not found.' });
		}

		res.status(200).json(personnel);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.updatePersonnelById = async (req, res) => {
	try {
		const updatedPersonnel = await Personnel.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
			}
		);

		if (!updatedPersonnel) {
			return res.status(404).json({ message: 'Personnel not found.' });
		}

		res.status(200).json(updatedPersonnel);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.deletePersonnelById = async (req, res) => {
	try {
		const deletedPersonnel = await Personnel.findByIdAndRemove(req.params.id);

		if (!deletedPersonnel) {
			return res.status(404).json({ message: 'Personnel not found.' });
		}

		res.status(200).json({ message: 'Personnel deleted successfully.' }); // No content in the response (successful deletion)
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

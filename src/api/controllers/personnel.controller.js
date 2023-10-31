const Personnel = require('../models/personnel.model');

exports.createPersonnel = async (req, res) => {
	const qr_code =
		'PQCA' + (await Math.random().toString(36).substring(2, 8)).toUpperCase();
	const { first_name, last_name, position } = req.body;
	try {
		const personnel = await Personnel.create({
			first_name: first_name,
			last_name: last_name,
			position: position,
			qr_code: qr_code,
		});

		res.status(201).json(personnel);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.getPersonnel = async (req, res) => {
	try {
		const personnel = await Personnel.find();

		res.status(200).json(personnel);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.updatePersonnel = async (req, res) => {
	try {
		const { qr_code } = req.params; // Assuming you use the QR code as a unique identifier
		const updateData = req.body;

		const updatedPersonnel = await Personnel.findOneAndUpdate(
			{ qr_code },
			updateData,
			{ new: true } // To get the updated document
		);

		if (!updatedPersonnel) {
			return res.status(404).json({ message: 'Personnel not found.' });
		}

		res.status(200).json(updatedPersonnel);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.deletePersonnel = async (req, res) => {
	try {
		const { qr_code } = req.params;

		const deletedPersonnel = await Personnel.findOneAndRemove({ qr_code });

		if (!deletedPersonnel) {
			return res.status(404).json({ message: 'Personnel not found.' });
		}

		res.status(204).json(); // No content in the response (successful deletion)
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

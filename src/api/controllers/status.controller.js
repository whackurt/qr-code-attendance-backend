const PersonnelStatus = require('../models/status.model');

// Controller logic for personnel statuses
exports.getAllStatuses = async (req, res) => {
	try {
		const statuses = await PersonnelStatus.find();

		res.status(200).json(statuses);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.createStatus = async (req, res) => {
	try {
		const { status } = req.body;

		const newStatus = await PersonnelStatus.create({ status });

		res.status(201).json(newStatus);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.getStatusById = async (req, res) => {
	try {
		const { id } = req.params;

		const status = await PersonnelStatus.findById(id);

		res.status(200).json(status);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.updateStatusById = async (req, res) => {
	try {
		const { id } = req.params;
		const { status } = req.body;

		const updatedStatus = await PersonnelStatus.findByIdAndUpdate(
			id,
			{ status },
			{ new: true }
		);

		res.status(200).json(updatedStatus);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.deleteStatusById = async (req, res) => {
	try {
		const { id } = req.params;

		await PersonnelStatus.findByIdAndDelete(id);

		res.status(204).send();
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

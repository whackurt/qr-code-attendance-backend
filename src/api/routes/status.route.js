const express = require('express');
const statusController = require('../controllers/status.controller');
const { verifyToken } = require('../middlewares/verifyToken');

const router = express.Router();

// Get all personnel statuses
router.get('/', verifyToken, statusController.getAllStatuses);

// Create a new personnel status
router.post('/', verifyToken, statusController.createStatus);

// Get personnel status by ID
router.get('/:id', verifyToken, statusController.getStatusById);

// Update personnel status by ID
router.put('/:id', verifyToken, statusController.updateStatusById);

// Delete personnel status by ID
router.delete('/:id', verifyToken, statusController.deleteStatusById);

module.exports = router;

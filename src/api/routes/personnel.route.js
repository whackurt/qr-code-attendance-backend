const express = require('express');
const personnelController = require('../controllers/personnel.controller');
const { verifyToken } = require('../middlewares/verifyToken');

const router = express.Router();

// Get all personnel
router.get('/', verifyToken, personnelController.getPersonnel);

// Create a new personnel
router.post('/', verifyToken, personnelController.createPersonnel);

// Get personnel by ID
router.get('/:id', verifyToken, personnelController.getPersonnelById);

// Update personnel by ID
router.put('/:id', verifyToken, personnelController.updatePersonnelById);

// Delete personnel by ID
router.delete('/:id', verifyToken, personnelController.deletePersonnelById);

module.exports = router;

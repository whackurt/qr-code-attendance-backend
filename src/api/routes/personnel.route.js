const express = require('express');
const personnelController = require('../controllers/personnel.controller');
const { verifyToken } = require('../middlewares/verifyToken');

const router = express.Router();

// Get all personnel
router.get('/', verifyToken, personnelController.getPersonnel);

// Create a new personnel
router.post('/', verifyToken, personnelController.createPersonnel);

module.exports = router;

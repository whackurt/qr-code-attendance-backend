// Import required modules
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToDb = require('./config/connectToDb');

// Create an instance of Express
const app = express();

// dependencies
const authRoutes = require('./api/routes/auth.route');
const personnelRoutes = require('./api/routes/personnel.route');
const attendanceRoutes = require('./api/routes/attendance.route');
const statusRoutes = require('./api/routes/status.route');

// connect to database
connectToDb();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/personnel', personnelRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/status', statusRoutes);

// start server
app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});

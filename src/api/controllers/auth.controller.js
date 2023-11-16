const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.register = async (req, res) => {
	try {
		const { username, password } = req.body;

		// Check if the username already exists
		const existingUser = await User.findOne({ username });
		if (existingUser) {
			return res.status(400).json({ message: 'Username is already taken.' });
		}

		// Hash the password
		const hashedPassword = await bcrypt.hashSync(password, 10);

		// Create a new user
		const newUser = new User({
			username,
			password: hashedPassword,
		});

		await newUser.save();

		res.status(201).json({ message: 'User registered successfully.' });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.login = async (req, res) => {
	try {
		const { username, password } = req.body;

		// Check if the user exists
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(401).json({ message: 'Invalid credentials.' });
		}

		// Check if the password is correct
		const isPasswordValid = await bcrypt.compareSync(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({ message: 'Invalid credentials.' });
		}

		// Create a JSON Web Token (JWT) for authentication
		const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET);

		res.status(200).json({ token, id: user._id });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

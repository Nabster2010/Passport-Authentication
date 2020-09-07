const User = require('../models/user.model');
const bcrypt = require('bcrypt');

const userController = {
	createUser: async (req, res) => {
		try {
			const { email, password, userName } = req.body;
			const hashedPassword = bcrypt.hashSync(password, 10);
			const newUser = await User.create({
				email,
				password: hashedPassword,
				displayName: userName,
			});
			return res.redirect('/auth/login');
		} catch (err) {
			console.log(err);
		}
	},
	findAll: async (req, res) => {
		try {
			const user = await User.findAll();
			return res.json(user);
		} catch (err) {
			console.log(err);
		}
	},
	findOrCreate: async (profile) => {
		try {
			const user = await User.findOne({ where: { googleId: profile.id } });
			if (!user) {
				await User.create({
					email: profile.emails[0].value,
					googleId: profile.id,
					displayName: profile.displayName,
				});
			}
		} catch (err) {}
	},
};

module.exports = userController;

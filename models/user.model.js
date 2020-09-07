const { DataTypes } = require('sequelize');
const db = require('../config/db');

const User = db.define('user', {
	email: DataTypes.STRING,
	password: DataTypes.STRING,
	googleId: DataTypes.STRING,
	displayName: DataTypes.STRING,
});

module.exports = User;

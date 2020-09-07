const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const { DB_NAME, DB_USER, DB_PASSWORD, DB_DIALECT, DB_HOST } = process.env;
const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
	host: DB_HOST,
	dialect: DB_DIALECT,
	operatorAliases: false,

	pool: {
		max: 5,
		min: 0,
		acquire: 3000,
		idle: 10000,
	},
});

module.exports = db;

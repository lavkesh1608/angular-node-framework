var Sequelize = require('sequelize'), config = require(__dirname + '/../dbconfig'), sequelize = new Sequelize(config.database, config.username, config.password, {
	host : config.host,
	logging : false
});

var Users = sequelize.define('users', {
	id : {
		type : Sequelize.INTEGER,
		allowNull : false,
		primaryKey : true,
		autoIncrement : true,
		defaultValue : ''
	},
	full_name : {
		type : Sequelize.STRING,
		allowNull : false,
		defaultValue : ''
	},
	email_address : {
		type : Sequelize.STRING,
		allowNull : false,
		defaultValue : ''
	},
	password : {
		type : Sequelize.STRING,
		allowNull : false,
		defaultValue : ''
	},
	resetPasswordToken : {
		type : Sequelize.STRING,
		allowNull : true,
		defaultValue : ''
	},
	resetPasswordExpires : {
		type : Sequelize.DATE,
		allowNull : true,
		defaultValue : ''
	},
	created_at : {
		type : Sequelize.INTEGER,
		allowNull : false,
		defaultValue : ''
	},
	updated_at : {
		type : Sequelize.INTEGER,
		allowNull : false,
		defaultValue : ''
	},
	profile_pic : {
		type : Sequelize.STRING,
		allowNull : false,
		defaultValue : ''
	},
	is_active : {
		type : Sequelize.BOOLEAN,
		allowNull : false,
		defaultValue : '1'
	}
}, {
	freezeTableName : true,
	tablename : 'users',
	timestamps : false
});

module.exports = {
	Users : Users
};

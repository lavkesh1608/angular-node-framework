var fs = require('fs');
var shell = require('shelljs/global');
var dbconfig = require("./dbconfig")
var mysql = require('mysql');
var logElement = 0;

exec('clear');
var table = '';
var createFile = false;
var args = process.argv.slice(2);
if (args && args.length > 1)
	if (args[1] == 'F')
		createFile = true;

if (args.length == 0) {
	console.log('Oops! Wrong command.\nuse-> node genmodel PARAM1 PARAM2\nPARAM1(Mandatory) - tablename\nPARAM2(Optional) - C or F [C-console(default), F-file]');
	process.exit(1);
} else {
	table = args[0];
}

var connection = mysql.createConnection({
	host : dbconfig.host,
	user : dbconfig.username,
	password : dbconfig.password,
	database : dbconfig.database
});

connection.connect();
if (table.toLowerCase() == "all") {
	var query = connection.query('show tables', function(err, schema) {
		if (err) {
			console.log(err);
		} else {
			schema.forEach(function(element, index, array) {
				var t = element['Tables_in_' + dbconfig.database];
				GenModelForTable(t);
			});
		}
	});
} else {
	GenModelForTable(table);
}

function GenModelForTable(tablename) {
	var query = connection.query('describe ' + tablename, function(err, schema) {
		if (err && err.code == 'ER_NO_SUCH_TABLE') {
			console.log('Oops! your table do not exists in database');
			process.exit(1);
		} else if (err) {
			console.log(err);
		} else {
			generateModel(schema, tablename);
		}
	});
}

/* element: { Field: ' company ',  Type: ' varchar(255) ', Null: ' NO ', Key: ' ', Default: null, Extra: ' ' } */
function generateModel(schema, modelname) {
	var modelText = '';
	console.log(modelname);
	var camelModel = getCamel(modelname);
	modelText = modelText.concat('var Sequelize = require(\'sequelize\'),\n');
	modelText = modelText.concat('config = require(__dirname + \'/../dbconfig\'),\n');
	modelText = modelText.concat('sequelize = new Sequelize(config.database, config.username, config.password, {host: config.host, logging: false});\n\n');
	modelText = modelText.concat('var ').concat(camelModel).concat(' = sequelize.define(\'').concat(modelname.toLowerCase()).concat('\', {\n');

	var elementString = '';
	schema.forEach(function(element, index, array) {
		if (logElement)
			console.log(element);
		elementString = elementString.concat(element.Field).concat(': {\n\t');

		var tempString = buildElementString(element);
		var tempArr = tempString.split('|');

		tempArr.forEach(function(telement, tindex, tarray) {
			elementString = elementString.concat(telement);
			if (tarray.length - 2 > tindex)
				elementString = elementString.concat(',\n\t');
		});
		elementString = elementString.concat('\n}');

		if (array.length - 1 > index)
			elementString = elementString.concat(',\n');
	});
	modelText = modelText.concat(elementString);
	modelText = modelText.concat('\n}, {freezeTableName: true,  tablename:\'').concat(modelname.toLowerCase()).concat('\', timestamps: false });');
	modelText = modelText.concat('\n\nmodule.exports = { ').concat(camelModel).concat(': ').concat(camelModel).concat(' };');
	if (!logElement)
		console.log(modelText);
	if (createFile) {
		writeToFile(modelText, camelModel);
	}
}

function buildElementString(element) {
	var elementString = '';
	var type = parseType(element.Type.toString());
	var hasErr = false;
	switch (type) {
	case 'CHAR':
	case 'VARCHAR':
		elementString = elementString.concat('type: Sequelize.STRING');
		break;
	case 'INTEGER':
	case 'INT':
		elementString = elementString.concat('type: Sequelize.INTEGER');
		break;
	case 'TINYINT':
		elementString = elementString.concat('type: Sequelize.BOOLEAN');
		break;
	case 'TEXT':
		elementString = elementString.concat('type: Sequelize.TEXT');
		break;
	case 'BIGINT':
		elementString = elementString.concat('type: Sequelize.BIGINT');
		break;
	case 'FLOAT':
		elementString = elementString.concat('type: Sequelize.FLOAT');
		break;
	case 'DECIMAL':
		elementString = elementString.concat('type: Sequelize.DECIMAL')
		break;
	case 'TIMESTAMP':
	case 'DATETIME':
	case 'DATE':
		elementString = elementString.concat('type: Sequelize.DATE');
		break;
	case 'BLOB':
		elementString = elementString.concat('type: Sequelize.BLOB');
		break;
	case 'UUID':
		elementString = elementString.concat('type: Sequelize.UUID');
		break;
	default:
		hasErr = true;
		elementString = elementString.concat('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>error: datatype is not defined-');
		elementString = elementString.concat(type);
		break;
	}
	//Defining length
	elementString = elementString.concat(parseLength(element.Type.toString())).concat('|');

	//Checking nullability
	if (element.Null && element.Null == 'NO')
		elementString = elementString.concat('allowNull: false').concat('|');
	else
		elementString = elementString.concat('allowNull: true').concat('|');

	//Check Key Primary
	if (element.Key && element.Key == 'PRI')
		elementString = elementString.concat('primaryKey: true').concat('|');

	//Check Auto Increment
	if (element.Extra && element.Extra == 'auto_increment')
		elementString = elementString.concat('autoIncrement: true').concat('|');

	//Check default
	if (element.Default && element.Default != null && element.Default != 'CURRENT_TIMESTAMP')
		elementString = elementString.concat('defaultValue: \'').concat(element.Default).concat('\'').concat('|');
	else
		elementString = elementString.concat('defaultValue: \'\'').concat(' | ');

	//console.log(elementString);
	return elementString;
}

function parseType(type) {
	var arr = type.split(/[()]/);
	if (arr && arr.length > 0) {
		return arr[0].toUpperCase();
	} else {
		return type.toUpperCase();
	}
}

function parseLength(type) {
	//var arr = type.split(/[()]/);
	var arr = type.split(' (');
	if (arr && arr.length > 0) {
		return type.replace(arr[0], '');
	} else {
		return '';
	}
}

function writeToFile(modelData, modelName) {
	try {
		//modelName = getSingular(modelName);
		var filePath = 'models/' + modelName + '.js';
		fs = require('fs');
		fs.exists(filePath, function(exists) {
			if (exists)
				filePath = 'models/' + modelName + '_copy.js';

			fs.writeFile(filePath, modelData, function(err) {
				if (err) {
					console.log(err);
				} else {
					if (exists)
						console.log('\n\n>>>Copy of model is created at: ' + filePath);
					else
						console.log('\n\nModel is created at: ' + filePath);
					fs.close
				}
			});
		});
	} catch (e) {
		console.log(e);
	}
}

function getSingular(modelName) {
	if (modelName.substr(modelName.length - 1, 1).toLowerCase() == 's')
		return modelName.substr(0, modelName.length - 1);
	else
		return modelName;
}

function getCamel(modelName) {
	/*
	 var prefixEndAt = modelName.indexOf('_');
	 if (prefixEndAt > 0) {
	 modelName = modelName.substr(prefixEndAt + 1, modelName.length - prefixEndAt - 1);
	 }
	 console.log(modelName);
	 return modelName.substr(0, 1).toUpperCase().concat(modelName.substr(1, modelName.length - 1));
	 * */

	return modelName.substr(0, 1).toUpperCase().concat(modelName.substr(1, modelName.length - 1));
}

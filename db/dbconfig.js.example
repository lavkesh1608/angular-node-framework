//export NODE_ENV=production     //use this command to set enviorment variabl
var database_name = 'freshmetrics'
var username="root"
var password="root"
var hostname="localhost"

if (process.env.NODE_ENV == 'development') {
	console.log("process.env.NODE_ENV == 'development'")
	database_name = 'freshmetrics_dev'
}

if (process.env.NODE_ENV == 'testing') {
	console.log("process.env.NODE_ENV == 'testing'")
	database_name = 'freshmetrics_test'
}



module.exports = {

	username : process.env.SEQ_USER || username,
	password : process.env.SEQ_PW || password,
	database : process.env.SEQ_DB || database_name,
	host : process.env.SEQ_HOST || hostname, 
	pool : {
		maxConnections : process.env.SEQ_POOL_MAX || 5,
		maxIdleTime : process.env.SEQ_POOL_IDLE || 30000
	}
};

const Pool = require("pg").Pool;

const pool = new Pool({
	user: "joe",
	password: "optionm",
	host: "localhost",
	port: 5432,
	database: "ecommerceapp",
});

module.exports = pool;

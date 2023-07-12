const express = require("express");
const app = express();
const usersRouter = require("express").Router();

const pool = require("../db");
const verifyToken = require("../utils/verifyToken");

// Verifies token
usersRouter.use("/", async (req, res, next) => {
	const validToken = await verifyToken(req.query.token);
	if (validToken.status !== 200) {
		res.status(401).send("Authentication failed.");
	}
	next();
});

// Gets user's info
usersRouter.get("/:userName", async (req, res) => {
	const { userName } = req.params;
	//const validToken = await verifyToken(req.query.token);
	try {
		const userInfo = await pool.query(
			"SELECT * FROM users WHERE username = $1",
			[userName]
		);
		res.status(200).json(userInfo);
		// if (validToken.status === 200) {

		// }
	} catch (err) {
		res.status(401).send("Authentication failed");
	}
});

//Updates user's info

usersRouter.put("/:userName", async (req, res) => {
	const {
		userName,
		firstName,
		lastName,
		emailAddress,
		phoneNumber,
		streetAddress,
		city,
		state,
		zipcode,
	} = req.body;

	try {
		const updatedInfo = pool.query(
			"UPDATE users SET  first_name = $2, last_name = $3, email_address = $4, phone_number = $5, street_address = $6, city = $7, state = $8, zipcode = $9 WHERE username = $1",
			[
				userName,
				firstName,
				lastName,
				emailAddress,
				phoneNumber,
				streetAddress,
				city,
				state,
				zipcode,
			]
		);
		res.status(204).json(updatedInfo);
	} catch (err) {
		console.log(err);
		res.status(400).send("");
	}
});

module.exports = usersRouter;

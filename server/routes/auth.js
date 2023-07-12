const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const authRouter = require("express").Router();

const pool = require("../db");

//user sign up
authRouter.post("/signup", async (req, res) => {
	const {
		username,
		password,
		firstName,
		lastName,
		emailAddress,
		phoneNumber,
		streetAddress,
		city,
		state,
		zipcode,
	} = req.body;

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, parseInt(salt));
	const userId = uuidv4();

	try {
		const signUp = await pool.query(
			"INSERT INTO users (user_id, username, password, first_name, last_name, email_address, phone_number, street_address, city, state, zipcode) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
			[
				userId,
				username,
				hashedPassword,
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
		res.status(201).json(signUp);
	} catch (err) {
		console.log(err);
	}
});

//Login
authRouter.post("/login", async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await pool.query("SELECT * FROM users WHERE username = $1", [
			username,
		]);
		if (!user.rows.length) {
			res.json("User does not exist");
		}

		const passwordMatch = await bcrypt.compare(password, user.rows[0].password);
		const token = jwt.sign({ username }, "e-commerce-appFULLSTACKCOD#C@D#MI", {
			expiresIn: "1hr",
		});

		res.status(200).json({ username, token });
	} catch (err) {
		console.log(err);
	}
});

module.exports = authRouter;

const express = require("express");
const app = express();
const usersRouter = require("express").Router();
const pool = require("../db");
const verifyToken = require("../utils/verifyToken");

// Verifies token
usersRouter.use("/", verifyToken, async (req, res, next) => {
	next();
});

// Gets user's info
usersRouter.get("/:username", async (req, res) => {
	const { username } = req.params;
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
usersRouter.put("/:username", async (req, res) => {
	const {
		username,
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
		const updatedInfo = await pool.query(
			"UPDATE users SET first_name = $2, last_name = $3, email_address = $4, phone_number = $5, street_address = $6, city = $7, state = $8, zipcode = $9 WHERE username = $1 RETURNING *",
			[
				username,
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
		res.status(200).json(updatedInfo);
	} catch (err) {
		console.log(err);
	}
});

//Gets user's orders
usersRouter.get("/:username/orders", verifyToken, async (req, res) => {
	const { username } = req.params;
	try {
		const userId = await pool.query(
			"SELECT user_id FROM users WHERE username = $1",
			[username]
		);
		const userOrders = await pool.query(
			"SELECT * FROM orders WHERE user_id = $1",
			[userId.rows[0].user_id]
		);
		if (!userOrders.rows) {
			res.status(404).send("No orders to show.");
		}
		res.status(200).json(userOrders);
	} catch (err) {
		console.log(err);
	}
});

usersRouter.get("/:username/orders/:orderId", verifyToken, async (req, res) => {
	const { username, orderId } = req.params;
	try {
		const order = await pool.query("SELECT * FROM orders WHERE order_id = $1", [
			orderId,
		]);
		if (!order.rows) {
			res.status(404).send("Order not found");
		}
		res.status(200).json(order);
	} catch (err) {
		console.log(err);
	}
});

module.exports = usersRouter;

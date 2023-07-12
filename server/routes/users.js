const express = require("express");
const app = express();
const usersRouter = require("express").Router();

const pool = require("../db");
const verifyToken = require("../utils/verifyToken");

// Gets user's info
usersRouter.get("/:userName", async (req, res) => {
	const { userName } = req.params;
	const validToken = await verifyToken(req.query.token);
	console.log(validToken);
	try {
		if (validToken.status === 200) {
			const userInfo = await pool.query(
				"SELECT * FROM users WHERE username = $1",
				[userName]
			);

			res.status(200).json(userInfo);
		}
	} catch (err) {
		res.status(401).send("Authentication failed");
	}
});

//Updates user's info

usersRouter.put("/:userName", async (req, res) => {});

module.exports = usersRouter;

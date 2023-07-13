const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

const verifyTokenNew = async (req, res, next) => {
	const { token } = req.query;
	try {
		const validated = await jwt.verify(
			token,
			"e-commerce-appFULLSTACKCOD#C@D#MI"
		);
		if (!validated) {
			res.status(401).send("Authentication failed.");
		}
		console.log("Authentication successful.");
		next();
	} catch (err) {
		console.log(err);
	}
};

const verifyToken = async (token) => {
	try {
		const validated = await jwt.verify(
			token,
			"e-commerce-appFULLSTACKCOD#C@D#MI"
		);
		if (validated) {
			return {
				status: 200,
				title: "Authentication succeeded",
				validated: validated,
			};
		}
	} catch (err) {
		console.log(err);
		return {
			status: 401,
			title: "Authentication failed",
			err: err,
		};
	}
};

module.exports = verifyToken;

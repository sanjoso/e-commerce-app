const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
	const { token } = req.query;
	try {
		const validated = await jwt.verify(
			token,
			"e-commerce-appFULLSTACKCOD#C@D#MI",
			(err, validated) => {
				if (err) {
					res.status(403).send("Authentication failed.");
				} else {
					req.validated = true;
				}
			}
		);
		next();
	} catch (err) {
		console.log(err);
	}
};

const verifyTokenOld = async (token) => {
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

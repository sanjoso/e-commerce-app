const jwt = require("jsonwebtoken");

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

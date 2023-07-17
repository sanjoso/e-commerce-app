const express = require("express");
const cartRouter = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const pool = require("../db");
const verifyToken = require("../utils/verifyToken");

// Verifies token
cartRouter.use("/", verifyToken, async (req, res, next) => {
	next();
});

// Gets the cart id
cartRouter.param("username", async (req, res, next) => {
	const { username } = req.params;
	try {
		const cartId = await pool.query(
			"SELECT user_id FROM users WHERE username = $1",
			[username]
		);
		req.cartId = cartId.rows[0].user_id;
		//console.log(cartId.rows[0].user_id);
		next();
	} catch (err) {
		console.log(err);
	}
});

// Gets the items in a user's cart
cartRouter.get("/:username", async (req, res) => {
	const { cartId } = req.params;
	console.log("here");
	console.log(req.cartId);
	try {
		const cartItems = await pool.query(
			"SELECT * FROM cart WHERE cart_id = $1",
			[cartId]
		);

		if (!cartItems.rows) {
			res.status(204).send("Cart is empty.");
		}
		res.status(200).json(cartItems.rows);
	} catch (err) {
		console.log(err);
	}
});

// Adds an item to the cart
cartRouter.post("/:cartId", async (req, res) => {
	const { cartId } = req.params;
	const { productId, quantity } = req.body;
	try {
		const addedToCart = await pool.query(
			"INSERT INTO cart (cart_id, product_id, quantity) VALUES ($1, $2, $3)",
			[cartId, productId, quantity]
		);
		if (!addedToCart) {
			res.status(500).send("Server error. Please try again.");
		}
		res.status(200).send("Item added successfully.");
	} catch (err) {
		console.log(err);
	}
});

// Checkout endpoint that creates an order
cartRouter.post("/:cartId/checkout", async (req, res) => {
	const {
		cartId,
		shiptoStreet,
		shiptoCity,
		shiptoState,
		shiptoZipcode,
		cardNumber,
		expirationDate,
		CVV,
	} = req.body;

	try {
		// First, check that cart exists
		const cartExists = await pool.query(
			"SELECT * FROM cart where cart_id = $1",
			[cartId]
		);
		if (!cartExists) {
			res.status(204).send("Cart is empty.");
		}
		//Then, charge the card
		const total = "SELECT SUM(price) AS total FROM cart WHERE cart_id = x"; //FIND THE TOTAL FROM ADDING THE PRICES IN THE DB
		const chargeCard = true;
		if (!chargeCard) {
			res.status(400).send("Payment not successful.");
		}
		//Then, create an order in the database
		const orderId = uuidv4();
		const orderCreated = await pool.query(
			"INSERT INTO orders (order_id, date, total, shipto_street, shipto_city, shipto_state, shipto_zipcode, email, pay_method, card_num, user_id VALUES $1,$2, $3, $4, $5, $6, $7, $8, $9, $10, $11",
			[orderId, Date.now()]
		);
	} catch (err) {
		console.log(err);
	}
});

module.exports = cartRouter;

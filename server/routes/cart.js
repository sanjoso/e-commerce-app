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
		next();
	} catch (err) {
		console.log(err);
	}
});

// Gets the items in a user's cart
cartRouter.get("/:username", async (req, res) => {
	try {
		const cartItems = await pool.query(
			"SELECT * FROM cart WHERE cart_id = $1",
			[req.cartId]
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
cartRouter.post("/:username", async (req, res) => {
	const { productId, quantity } = req.body;
	try {
		const itemPriceString = await pool.query(
			"SELECT sell_price FROM product WHERE product_id = $1",
			[productId]
		);
		const itemPrice = parseFloat(
			itemPriceString.rows[0].sell_price.replace(/[^0-9.-]+/g, "")
		);
		const total = Number(quantity) * Number(itemPrice);

		const addedToCart = await pool.query(
			"INSERT INTO cart (cart_id, product_id, quantity, total) VALUES ($1, $2, $3, $4)",
			[req.cartId, productId, quantity, total]
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
cartRouter.post("/:username/checkout", async (req, res) => {
	const {
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
			[req.cartId]
		);
		if (!cartExists.rows) {
			res.status(204).send("Cart is empty.");
		}
		//Then, charge the card
		const payMethod = "CitizensBankChecking";
		const cardNumLastFour = Number(cardNumber.substring(cardNumber.length - 4));
		const rawTotal = await pool.query(
			"SELECT SUM(total) AS total FROM cart WHERE cart_id = $1",
			[req.cartId]
		);
		const total = parseFloat(rawTotal.rows[0].total.replace(/[^0-9.-]+/g, ""));

		const chargeCard = true;
		if (!chargeCard) {
			res.status(400).send("Payment not successful.");
		}
		//Then, create an order in the database
		const orderId = uuidv4();
		const date = new Date();
		const orderCreated = await pool.query(
			"INSERT INTO orders (order_id, date, total, shipto_street, shipto_city, shipto_state, shipto_zipcode, pay_method, card_num, user_id) VALUES ($1,$2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING order_id",
			[
				orderId,
				date,
				total,
				shiptoStreet,
				shiptoCity,
				shiptoState,
				shiptoZipcode,
				payMethod,
				cardNumLastFour,
				req.cartId,
			]
		);
		console.log(orderCreated);
		if (!orderCreated.rows[0].order_id) {
			res.status(400).send("Something went wrong.");
		}
		res.status(200).send("Order created successfully");
	} catch (err) {
		console.log(err);
	}
});

module.exports = cartRouter;

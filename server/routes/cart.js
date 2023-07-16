const express = require("express");
const cartRouter = require("express").Router();
const pool = require("../db");
const verifyToken = require("../utils/verifyToken");

// Verifies token
cartRouter.use("/", verifyToken, async (req, res, next) => {
	next();
});

// Gets the cart id
cartRouter.use("/", async (req, res, next) => {
	const { username } = req.body;
	try {
		const cartId = await pool.query(
			"SELECT user_id FROM users WHERE username = $1",
			[username]
		);
		req.cartId = cartId;
		next();
	} catch (err) {
		console.log(err);
	}
});

// Gets the items in a user's cart
cartRouter.get("/:cartId", async (req, res) => {
	const { cartId } = req.params;
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

module.exports = cartRouter;

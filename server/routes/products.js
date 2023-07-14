const express = require("express");
const app = express();
const productsRouter = require("express").Router();
const pool = require("../db");

// Get a specific product
productsRouter.get("/:productId", async (req, res) => {
	const { productId } = req.params;
	try {
		const foundProduct = await pool.query(
			"SELECT * FROM product WHERE product_id = $1",
			[productId]
		);
		if (!foundProduct.rows) {
			res.status(404).send("Product doens't exist");
		}
		res.status(200).send(foundProduct);
	} catch (err) {
		console.log(err);
	}
});

// Get products by category
productsRouter.get("/category/:category", async (req, res) => {
	const { category } = req.params;
	try {
		const products = await pool.query(
			"SELECT * FROM product WHERE category = $1",
			[category]
		);
		if (!products.rows) {
			res.status(404).send("Category does not exist");
		}
		res.status(200).json(products);
	} catch (err) {
		console.log(err);
	}
});

module.exports = productsRouter;

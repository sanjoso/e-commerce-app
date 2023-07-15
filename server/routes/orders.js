const express = require("express");
const ordersRouter = require("express").Router();
const pool = require("../db");
const verifyToken = require("../utils/verifyToken");

module.exports = ordersRouter;

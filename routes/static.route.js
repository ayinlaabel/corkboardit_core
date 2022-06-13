const express = require("express");

/**
 * @sequelize - connection for the database using sequelize
 * @db - Model for the database using sequelize
 */

const { sequelize } = require("../database/mssql");
const db = require("../models/index");

const router = express.Router();

router.get("/category", async (req, res, next) => {
  await sequelize.authenticate();

  let categories = await db.Category.findAll();

  res.json({ categories });
});

module.exports = router;

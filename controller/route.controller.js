const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const { sequelize } = require("../database/mssql");
const db = require("../models/index");

exports.login = async (req, res, next) => {
  await sequelize.authenticate();

  const user = await db.User.findOne({
    where: { email: req.body.email },
  });

  if (!user) {
    res.json({ message: `No user found with ${req.body.email}` });
  }

  if (user.pin != req.body.pin) {
    res.json({ message: "Invalid password, try again." });
  } else {
    const token = jwt.sign(
      { user_id: user.id },
      process.env.JSONWEBTOKENSECERT
    );
    res.json({ user, token });
  }
};

exports.corkBoard = async (req, res, next) => {
  try {
    await sequelize.authenticate();
    console.log("Connected to database successfully...");

    const userId = req.userId;
    console.log(userId);

    const { name, category, visibility, password } = req.body;
    const corkboard = { name, category, visibility, password, userId };

    const newCorkBoard = await db.Corkboard.create(corkboard);

    if (!newCorkBoard) {
      console.log("Something went wrong!");
    } else {
      // console.log(newCorkBoard);
      res.status(201).json(newCorkBoard);
    }
  } catch (error) {
    console.error(error);
  }
};

exports.getRecentCorkboard = async (req, res, next) => {
  await sequelize.authenticate();

  const corkboard = await db.Corkboard.findAll({
    order: [["id", "DESC"]],
    limit: 4,
  });

  res.send(corkboard);
};

exports.getCorkboardById = async (req, res, next) => {
  await sequelize.authenticate();

  const corkboard = await db.Corkboard.findOne({
    where: {
      id: req.body.id,
    },
  });

  res.send(corkboard);
};

exports.getAllCorkboard = async (req, res, next) => {
  await sequelize.authenticate();

  const corkboard = await db.Corkboard.findAll({ order: [["id", "DESC"]] });

  res.send(corkboard);
};

exports.getCorkbyUserId = async (req, res, next) => {
  await sequelize.authenticate();

  const corkboard = await db.Corkboard.findAll({
    where: {
      userId: req.body.id,
    },
    order: [["id", "DESC"]],
  });

  res.status(200).send(corkboard);
};

exports.getUserById = async (req, res, next) => {
  await sequelize.authenticate();
  const user = await db.User.findOne({
    where: {
      id: req.body.id,
    },
  });

  res.status(200).send(user);
};

exports.postPushPin = async (req, res, next) => {
  await sequelize.authenticate();
  const { corkboardId, url, description, tags } = req.body;
  let data = { url, description, tags, corkboardId };
  let pushpin = db.Pushpin.create(data);

  if (!pushpin) {
    res.status(400).send({ error: "Something went wrong, try again." });
  } else {
    console.log(pushpin);
    res.status(201).send(pushpin);
  }
};

exports.getPushPinByCorkboardId = async (req, res, next) => {
  await sequelize.authenticate();
  const pushpin = await db.Pushpin.findAll({
    where: {
      corkboardId: req.body.id,
    },
  });

  if (!pushpin) {
    res.status(200).send({ message: "No Pushpin to display." });
  } else {
    res.status(200).send(pushpin);
  }
};

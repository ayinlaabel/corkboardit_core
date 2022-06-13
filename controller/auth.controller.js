const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

exports.verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  console.log(token);

  if (token) {
    jwt.verify(token, process.env.JSONWEBTOKENSECERT, (err, decoded) => {
      console.log(decoded);
      if (err) {
        res.status(403).json({ error: "You are require to login." });
      } else {
        req.userId = decoded.user_id;
      }
      next();
    });
  } else {
    res.status(403).send({ error: "You are require to login." });
  }
};

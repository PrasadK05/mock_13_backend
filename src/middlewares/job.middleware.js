require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const token_secret = process.env.TOKEN_KEY;
const refreshToken_secret = process.env.REFRESHTOKEN_KEY;

const verifyToken = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(403).send({ status: false, message: "unauthorized" });
  }
  try {
    let veri = jwt.verify(token, token_secret);

    if (veri) {
      let user = await User.findOne({ email: veri.email });
      if (user) {
        next();
      } else {
        return res
          .status(403)
          .send({ status: false, message: "usernot found" });
      }
    }
  } catch (e) {
    return res.status(403).send({ status: false, message: e.message });
  }
};

module.exports = { verifyToken };

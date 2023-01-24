require("dotenv").config();
const jwt = require("jsonwebtoken");
const { findUser } = require("../controllers/user.controllers");

const token_secret = process.env.TOKEN_KEY;
const refreshToken_secret = process.env.REFRESHTOKEN_KEY;

const verifyAdminToken = async (req, res, next) => {
  let  token  = req.headers.authorization;
  if (!token) {
    return res.status(403).send({ status: false, message: "unathorized" });
  }
  try {
    let veri = jwt.verify(token, token_secret);
    if (veri) {
      let user = await findUser({ email: veri.email });
      if (user && user.role === "admin") {
        next();
      } else {
        return res
          .status(403)
          .send({ status: false, message: "usernot found" });
      }
    }
  } catch (e) {
    return res.status(403).send({ status: false, message: "jwt expired" });
  }
};

module.exports = { verifyAdminToken };
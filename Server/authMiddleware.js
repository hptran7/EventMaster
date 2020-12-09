const jwt = require("jsonwebtoken");
const models = require("./models");

async function authentication(req, res, next) {
  const headers = req.headers["authorization"];
  if (headers) {
    const decoded = jwt.verify(headers, "MYSECRET125");
    if (decoded) {
      const username = decoded.username;
      const userId = decoded.userId;
      const persistedUser = await models.User.findOne({
        where: {
          username: username,
        },
      });
      if (persistedUser) {
        res.locals.userId = userId;
        next();
      } else {
        res.json({ error: "Invalid username or password" });
      }
    } else {
      res.json({ error: "Invalid username or password" });
    }
  } else {
    res.json({ error: "Invalid username or password" });
  }
}
module.exports = authentication;

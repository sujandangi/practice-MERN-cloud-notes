const jwt = require("jsonwebtoken");
const JWT_SECRET = "$omething$ecret";

const fetchuser = (req, res, next) => {
  //verify jwt token, get user from jwt token and add id to req object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({error: "Please authenticate using a valid token"});
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).send({error: "Please authenticate using a valid token"});
  }
};

module.exports = fetchuser;
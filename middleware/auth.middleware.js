const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  //   const token = req.headers["token"];

  const token = req.query.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  
};

module.exports = authenticateToken;





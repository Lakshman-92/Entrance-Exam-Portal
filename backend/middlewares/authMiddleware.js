const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    
    // Check if the authorization header exists
    if (!authHeader) {
      return res.status(401).send({
        message: "Authorization header is missing.",
        success: false,
      });
    }
    
    // Split the "Bearer <token>"
    const token = authHeader.split(" ")[1];
    
    if (!token) {
      return res.status(401).send({
        message: "Token is missing.",
        success: false,
      });
    }
    
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userid = decoded.userid; // Attach decoded userid to the request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(403).send({
        message: "Token has expired. Please login again.",
        success: false,
      });
    }
    return res.status(400).send({
      message: "Invalid token.",
      success: false,
      data: error.message,
    });
  }
};

const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        message: "Please login first",
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded._id);

    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


exports.authorizeRoles = (...role) => {
  return (req, res, next) => {
    console.log(req.user);
    if (!role.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You are user not admin",
      });
    }
    next();
  };
};

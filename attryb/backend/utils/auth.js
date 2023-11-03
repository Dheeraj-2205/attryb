const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(404).json({
        success: false,
        message: "Please login to access the resources",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_TOKEN);

    req.user = await User.findById(decode._id);
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
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

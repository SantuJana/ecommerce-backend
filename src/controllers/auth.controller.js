const User = require("../models/user.model");
const createError = require('http-errors');

const createAccount = async (req, res, next) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(createError.BadRequest("Account Already Exists With The Given Email."));
  }
  console.log(req.body);
  const user = new User(req.body);
  await user.save();
  const response = {
    success: true,
    message: "Your Account Created Successfully",
  };
  res.send(response);
};

module.exports = {
  createAccount,
};

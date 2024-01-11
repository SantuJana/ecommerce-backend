const User = require("../models/user.model");

const createAccount = async (req, res) => {
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

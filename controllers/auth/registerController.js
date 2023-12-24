const { User } = require("../../models");
const bcrypt = require("bcrypt");

const registerController = {
  async register(req, res) {
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        return res.status(200).json({
          message: "all fields are required.",
        });
      }
      const userFound = await User.findOne({ email });
      if (userFound) {
        return res.status(200).json({
          message: "user already exists.",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hashed_password = await bcrypt.hash(password, salt);

      const user = new User({ username, email, password: hashed_password });
      await user.save();
      res.status(201).json({
        message: "registered successfully.",
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
};

module.exports = registerController;

const { User } = require("../../models");
const bcrypt = require("bcrypt");
const loginController = {
  async login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(200).json({
          message: "user not found.",
        });
      }
      const match_password = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!match_password) {
        return res.status(200).json({
          message: "invalid email or password.",
        });
      }
      const { password, __v, createdAt, updatedAt, ...others } = user._doc;
      res.status(200).json({ others, message: "Login successfully." });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
};

module.exports = loginController;

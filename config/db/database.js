const mongoose = require("mongoose");
const { MONGODB_URI } = require("../../config");

const dbConnect = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("DB connection successfully...");
  } catch (err) {
    console.log("DB connection failed.");
    process.exit(1);
  }
};

module.exports = dbConnect;

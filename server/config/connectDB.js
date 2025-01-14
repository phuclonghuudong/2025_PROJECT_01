const mongoose = require("mongoose");
require("dotenv").config();

if (!process.env.MONGOOSE_URI) {
  throw new Error("Please provide MONGOOSE_URI in the .env file");
}

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGOOSE_URI);
    console.log("connect DB");
  } catch (error) {
    console.log("Mongodb connect error ", error);
    process.exit(1);
  }
}

// export default connectDB;
module.exports = connectDB;

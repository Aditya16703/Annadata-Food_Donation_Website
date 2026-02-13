const mongoose = require("mongoose");
require("dotenv").config();
const colors = require("colors"); // Import the colors package

exports.connectDB = () => {
  if (!process.env.MONGODB_URI) {
    console.log("MONGODB_URI is not defined in environment variables".bgRed.white);
    return;
  }

  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log(`DB Connected Successfully to ${mongoose.connection.host}`.bgGreen.white);
    })
    .catch((err) => {
      console.log(`Error in Mongodb Connection: ${err.message}`.bgRed.white);
      if (err.message.includes('ENOTFOUND')) {
        console.log(`TIP: If you're seeing ENOTFOUND, ensure your IP is whitelisted in MongoDB Atlas and check if your DNS can resolve SRV records.`.yellow.bold);
      }
    });
};

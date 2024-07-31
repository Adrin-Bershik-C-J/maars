const mongoose = require("mongoose");
require('dotenv').config();

mongoose.set("debug", true); // Enable detailed logging

const dbConnection = async () => {
  try {
    const uri = process.env.MONGODB_LOCAL_URI;
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000, // Timeout after 10s instead of 30s
      connectTimeoutMS: 10000, // Timeout after 10s instead of no timeout
    });
    console.log("Connected to MongoDB database!");
  } catch (error) {
    console.error("Connection failed!", error);
  }
};

module.exports = dbConnection;

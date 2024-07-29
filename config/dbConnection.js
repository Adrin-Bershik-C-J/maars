const mongoose = require("mongoose");

mongoose.set("debug", true); // Enable detailed logging

const dbConnection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/clinic", {
      serverSelectionTimeoutMS: 10000, // Timeout after 10s instead of 30s
      connectTimeoutMS: 10000, // Timeout after 10s instead of no timeout
    });
    console.log("Connected to MongoDB database!");
  } catch (error) {
    console.error("Connection failed!", error);
  }
};

module.exports = dbConnection;

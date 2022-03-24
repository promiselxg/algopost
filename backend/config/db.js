const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_URI);

    console.log(
      `MongoDB Connected: ${conn.connection.host}`.yellow.bold.underline
    );
  } catch (error) {
    console.log(error.red);
    process.exit(1);
  }
};

module.exports = connectDB;

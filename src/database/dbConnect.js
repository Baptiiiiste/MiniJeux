const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

if (!process.env.MONGODB_URI) {
  throw new Error(
    'URI must be specified in the configuration file: .env'
  )
}

async function dbConnect () {
  mongoose.connect(process.env.MONGODB_URI, {
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
  });
}

export default dbConnect
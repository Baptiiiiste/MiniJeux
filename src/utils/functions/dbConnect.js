const mongoose = require('mongoose');

if (!process.env.MONGODB_URI) {
  throw new Error(
    'URI must be specified in the configuration file: .env.local'
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
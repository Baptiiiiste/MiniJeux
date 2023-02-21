/** @type {import('next').NextConfig} */

module.exports = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    SALT: process.env.SALT,
  }
}

const Mongoose = require('mongoose');

module.exports = function makeOtpModel({ mainDBConnection }) {
  return async function getOtpModel() {
    const dbConnection = await mainDBConnection(); // Call the function to get the resolved connection
    try {
      return dbConnection.model('Otp');
    } catch (e) {
      const otpSchema = new Mongoose.Schema({
        email: { type: String, trim: true, required: true }, // Email to associate OTP with
        otp: { type: String, required: true }, // OTP value
        createdAt: { type: Date, default: Date.now }, // OTP creation time
        expiresAt: { type: Date, required: true }, // OTP expiration time
        isVerified: { type: Boolean, default: false }, // Verification status
      }, { collection: 'otp-verifications' });

      return dbConnection.model('Otp', otpSchema);
    }
  };
};

function makeOtpVerificationDb({ getOtpModel }) {
  return Object.freeze({
    createOtp,
    findOtpByEmail,
    verifyOtp,
    deleteExpiredOtps,
  });

  // Create a new OTP record
  async function createOtp({ email, otp, expiresAt }) {
    const otpModel = await getOtpModel();
    const newOtp = new otpModel({
      email,
      otp,
      expiresAt,
    });
    return await newOtp.save();
  }

  // Find OTP by email and otp value
  async function findOtpByEmail({ email, otp }) {
    const otpModel = await getOtpModel();
    return await otpModel.findOne({ email, otp }).lean();
  }

  // Verify and mark OTP as verified
  async function verifyOtp({ email, otp }) {
    const otpModel = await getOtpModel();
    const otpRecord = await otpModel.findOne({ email, otp });

    if (!otpRecord) {
      throw new Error("Invalid OTP");
    }

    if (otpRecord.expiresAt < Date.now()) {
      throw new Error("OTP has expired");
    }

    if (otpRecord.isVerified) {
      throw new Error("OTP already verified");
    }

    otpRecord.isVerified = true;
    await otpRecord.save();

    return otpRecord;
  }

  // Delete expired OTPs to clean up the database
  async function deleteExpiredOtps() {
    const otpModel = await getOtpModel();
    return await otpModel.deleteMany({ expiresAt: { $lt: Date.now() } });
  }
}

module.exports = makeOtpVerificationDb;

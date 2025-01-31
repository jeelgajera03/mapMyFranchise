module.exports = function makeGenerateAndStoreOtp({ OtpVerificationDb}) {
  return async function generateAndStoreOtp({ email }) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await OtpVerificationDb.createOtp({ email, otp, expiresAt });
    return otp;
  }
}
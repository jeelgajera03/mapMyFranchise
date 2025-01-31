module.exports = function makeVerifyOtp({OtpVerificationDb}){
  return async function verifyOtp({email, otp}){
    try {
      const result = await OtpVerificationDb.verifyOtp({ email, otp });
      if(result) return true;
      return false;
    } catch (error) {
      return false;
    }
  }
}
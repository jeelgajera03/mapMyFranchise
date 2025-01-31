const {
  getUserModel,
  getOtpModel,
} = require('../models');

const makeUserDb = require('./user-db');
const userDb = makeUserDb({getUserModel});

const makeOtpVerificationDb = require('./otp-verification-db');
const OtpVerificationDb = makeOtpVerificationDb({getOtpModel})

module.exports = {
  userDb, 
  OtpVerificationDb,
}
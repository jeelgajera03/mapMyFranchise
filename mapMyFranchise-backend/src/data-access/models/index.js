const makeUserModel = require('./User');
const makeOtpModel = require('./OtpVerification');

const Mongoose = require('mongoose');
const {mainDBConnection} = require('../../config/db')

const getUserModel = makeUserModel({Mongoose, mainDBConnection});
const getOtpModel = makeOtpModel({Mongoose, mainDBConnection});

module.exports = {
  getUserModel,
  getOtpModel,
}
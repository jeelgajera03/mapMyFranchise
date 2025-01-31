const bcrypt = require('bcrypt');
const { userDb, OtpVerificationDb } = require('../../data-access/mongo');
const jwt = require('jsonwebtoken');
const config = require('../../config')
const DEFAULT_PAGE_LIMIT = require('../../utils/constant.js');

const {
  AlreadyExistsError,
  AuthenticationFailedError,
  AuthorizationFailedError,
  DataNotFoundError,
  ForbiddenError,
  GeneralError,
  ObjectNotFoundError,
  PDIFailedError,
  RouteNotFoundError,
  TimeoutError,
  ValidationError,
} = require('../../exceptions');

const makeRegisterUser = require('./registerUser');
const registerUser = makeRegisterUser({bcrypt, userDb, AlreadyExistsError, ValidationError});

const makeLoggedInUser = require('./loggedInUser');
const loggedInUser = makeLoggedInUser({bcrypt, userDb, AuthenticationFailedError, jwt, config});

const makeGetAllUsers = require('./getAllUsers');
const getAllUsers = makeGetAllUsers({userDb, AuthenticationFailedError, DEFAULT_PAGE_LIMIT})

const makeGenerateAndStoreOtp = require('./generateAndStoreOtp.js');
const generateAndStoreOtp = makeGenerateAndStoreOtp({OtpVerificationDb});

const makeVerifyOtp = require('./verifyOtp.js');
const verifyOtp = makeVerifyOtp({OtpVerificationDb});

module.exports = {
  registerUser,
  loggedInUser,
  getAllUsers,
  verifyOtp,
  generateAndStoreOtp,
}
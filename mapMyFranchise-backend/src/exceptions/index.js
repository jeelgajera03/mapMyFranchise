const AlreadyExistsError = require('./already-exists.error');
const AuthenticationFailedError = require('./authentication-failed.error');
const AuthorizationFailedError = require('./authorization-failed.error');
const DataNotFoundError = require('./data-not-found.error');
const ForbiddenError = require('./forbidden.error');
const GeneralError = require('./general.error');
const ObjectNotFoundError = require('./object-not-found.error');
const PDIFailedError = require('./pdi-failed.error');
const RouteNotFoundError = require('./route-not-found.error');
const TimeoutError = require('./time-out.error');
const ValidationError = require('./validation.error');

module.exports = {
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
};

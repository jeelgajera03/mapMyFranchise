const { AuthorizationFailedError, AuthenticationFailedError } = require('../exceptions');
const { getUserModel } = require('../data-access/models');
const config = require('../config');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const sendError = (res, error) => {
  console.log({error})
  res.status(error.statusCode || 500).json({
    message: error.message || 'An unexpected error occurred',
    code: error.code || 'UNKNOWN_ERROR',
  });
};

module.exports = function makeHttpCallback({
  controller,
  byPassAuthCheck = false,
  isAdmin = false,
}) {
  return async (req, res) => {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      headers: req.headers,
      app: req.app,
      startTime: moment().valueOf(),
      uuid: req.uuid,
      files: req.files,
    };

    console.log({byPassAuthCheck})
    try {
      if (!byPassAuthCheck) {
        try {
          const authHeader = req.headers['authorization'];
          console.log({authHeader});
          if (!authHeader) {
            return sendError(res, new AuthenticationFailedError(102, 'Authorization Token missing'));
          }

          // Extract token from header
          const token = authHeader.split(' ')[1];
          console.log({token})

          // Verify JWT token
          const decodedToken = jwt.verify(token, config.jwt.secret);
          console.log({decodedToken})
          if (!decodedToken) {
            return sendError(res, new AuthorizationFailedError(103, 'Invalid Authorization Token'));
          }
          // Fetch user data from the database
          const userModel = await getUserModel();
          const userData = await userModel
            .findOne({ _id: decodedToken.userId })
            .lean()
            .exec();

          console.log({isAdmin,userData})

          if (isAdmin && userData?.userRole !== 1) {
            return sendError(res, new AuthorizationFailedError(104, 'Access denied for non-admin users'));
          }

          // Check if user is active
          if (!userData?.isActive) {
            return sendError(res, new AuthorizationFailedError(105, 'User account is inactive'));
          }

          // Attach user information to the request
          httpRequest.user = {
            ...decodedToken,
            userRole: userData?.userRole || 2,
          };
        } catch (err) {
          return sendError(res, new AuthorizationFailedError(106, 'Authentication failed'));
        }
      }

      let isTimedOut = false;
      try {
        const httpResponse = await controller(httpRequest);
        console.log({httpResponse});

        // Set response headers if provided
        if (httpResponse.headers) {
          for (const header in httpResponse.headers) {
            if (Object.prototype.hasOwnProperty.call(httpResponse.headers, header)) {
              res.setHeader(header, httpResponse.headers[header]);
            }
          }
        }

        // Send appropriate response
        if (httpResponse.statusCode >= 200 && httpResponse.statusCode < 300) {
          await res.status(httpResponse.statusCode).json(httpResponse.body);
        } else if ([301, 302, 307, 308].includes(httpResponse.statusCode)) {
          await res.redirect(httpResponse.statusCode, httpResponse.body);
        } else if (httpResponse.body && JSON.stringify(httpResponse.body).includes('timeout')) {
          isTimedOut = true;
          await sendError(res, httpResponse.body);
        } else {
          await sendError(res, httpResponse.body);
        }

      } catch (err) {
        if (JSON.stringify(err).includes('timeout')) {
          isTimedOut = true;
        }
        await sendError(res, err);
      }
    } catch (error) {
      sendError(res, error);
    }
  };
};

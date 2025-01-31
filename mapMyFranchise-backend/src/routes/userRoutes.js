const express = require('express');
const router = express.Router();
const makeHttpCallback = require('../http-server-callback/http-callback');
const { userController } = require('../controllers');

router.post(
  '/register',
  makeHttpCallback({
    controller: userController.registerUserAction,
    byPassAuthCheck: true,
  })
);

router.post(
  '/login',
  makeHttpCallback({
    controller: userController.loggedInUserAction,
    byPassAuthCheck: true,
  })
);

router.get(
  '/',
  makeHttpCallback({
    controller: userController.getAllUsersAction,
    byPassAuthCheck: false,
    isAdmin: true,
  })
);

module.exports = router;

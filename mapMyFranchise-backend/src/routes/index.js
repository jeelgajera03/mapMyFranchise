const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');

// Define routes with module prefixes
router.use('/users', userRoutes); // All user-related routes under `/users`

module.exports = router;

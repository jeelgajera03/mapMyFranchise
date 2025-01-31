const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes'); // Automatically resolves to `routes/index.js`

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Use the combined routes
app.use('/api/v1', routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

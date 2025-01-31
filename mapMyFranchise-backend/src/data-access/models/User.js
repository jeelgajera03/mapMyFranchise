const Mongoose = require('mongoose');

module.exports = function makeUserModel({ mainDBConnection }) {
  return async function getUserModel() {
    const dbConnection = await mainDBConnection(); // Call the function to get the resolved connection
    try {
      return dbConnection.model('User');
    } catch (e) {
      const userSchema = new Mongoose.Schema({
        name: { type: String, trim: true, required: true, default: '' },
        email: { type: String, trim: true, required: true, unique: true },
        password: { type: String, required: true },
        userRole: { type: Number, default: 2 },
        isActive: { type: Boolean, required: true, default: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
      }, { collection: 'users' });
      return dbConnection.model('User', userSchema);
    }
  };
};

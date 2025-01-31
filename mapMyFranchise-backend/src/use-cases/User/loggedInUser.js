const { ValidationError } = require("../../exceptions");

module.exports = function makeLoggedInUser({ bcrypt, userDb, AuthenticationFailedError, jwt, config }) {
  return async function loggedInUser({ email, password }) {
    if (!email || !password) {
      throw new ValidationError(107, 'All fields are required');
    }

    // Find user by email
    const user = await userDb.findUserByEmail({ email });
    if (!user) {
      throw new AuthenticationFailedError(108, 'Invalid email or password');
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new AuthenticationFailedError(108, 'Invalid email or password');
    }

    // Prepare JWT payload
    const tokenPayload = {
      userId: user._id,
      userRole: user.userRole,
    };

    // Generate JWT token
    const token = jwt.sign(tokenPayload, config.jwt.secret, { expiresIn: '1h' });

    return {
      name: user.name,
      email: user.email,
      userRole: user.userRole,
      token,
    };
  };
};

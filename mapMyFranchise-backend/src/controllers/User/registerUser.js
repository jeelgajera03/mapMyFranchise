module.exports = function makeRegisterUserAction({ registerUser, formatResponse, formatError }) {
  return async function registerUserAction(httpRequest) {
    const { name, email, password, userRole } = httpRequest.body;
    try {
      const result = await registerUser({ name, email, password, userRole });
      return formatResponse({ statusCode: 201, body: result });
    } catch (error) {
      return formatError({ error });
    }
  };
};

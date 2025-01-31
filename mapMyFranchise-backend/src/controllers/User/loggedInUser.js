module.exports = function makeLoggedInUserAction({ loggedInUser, formatResponse, formatError }) {
  return async function loggedInUserAction(httpRequest) {
    const { email, password } = httpRequest.body;
    try {
      const result = await loggedInUser({ email, password });
      return formatResponse({ statusCode: 200, body: result });
    } catch (error) {
      return formatError({ error });
    }
  };
};

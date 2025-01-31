module.exports = function makeGetAllUsers({ userDb, AuthenticationFailedError, DEFAULT_PAGE_LIMIT }) {
  return async function getAllUsers({ userProfile, queryParameters }) {

    const { page = 1, limit = DEFAULT_PAGE_LIMIT, filter = '' } = queryParameters;
    const skip = (page - 1) * limit;
    const isAdmin = userProfile['userRole'] === 1;
    if (!isAdmin) {
      throw new AuthenticationFailedError(109, "user has no permission to access all users list");
    }

    const users = await userDb.getAllUsers({
      skip: parseInt(skip),
      limit: parseInt(limit),
    })

    return {
      userList: users,
    }
  }
}